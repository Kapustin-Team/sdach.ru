'use client'

import type { ReactNode } from 'react'
import type { ProjectSpecification } from '@/data/projectSpecifications'

interface ProjectSpecificationSectionProps {
  specification: ProjectSpecification
  downloadUrl?: string
}

type TextPart = {
  text: string
  changed: boolean
}

type RowCell = {
  packageId: string
  text: string
  parts: TextPart[]
  changed: boolean
}

type CompareRow = {
  key: string
  cells: RowCell[]
}

type CompareGroup = {
  title: string
  rows: CompareRow[]
}

function tokenize(value: string) {
  return value.match(/\S+|\s+/g) || []
}

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim().toLowerCase()
}

function diffText(value: string, rowValues: string[]): TextPart[] {
  if (!value) return [{ text: '—', changed: false }]

  const normalizedValues = rowValues.map(normalize)
  const uniqueValues = new Set(normalizedValues)

  if (uniqueValues.size <= 1) {
    return [{ text: value, changed: false }]
  }

  const tokens = tokenize(value)
  const tokenValues = tokens.map(normalize)
  const otherTokenLists = rowValues
    .filter((rowValue) => normalize(rowValue) !== normalize(value))
    .map((rowValue) => tokenize(rowValue).map(normalize))

  if (otherTokenLists.length === 0) {
    return [{ text: value, changed: false }]
  }

  return tokens.map((text, index) => {
    const token = tokenValues[index]
    const isWhitespace = /^\s+$/.test(text)
    const existsInEveryOther = token && otherTokenLists.every((list) => list.includes(token))

    return {
      text,
      changed: !isWhitespace && !existsInEveryOther,
    }
  })
}

function renderParts(parts: TextPart[]): ReactNode {
  return parts.map((part, index) => {
    if (!part.changed) return <span key={index}>{part.text}</span>

    return (
      <strong key={index} className="font-semibold text-dark">
        {part.text}
      </strong>
    )
  })
}

function buildComparisonGroups(specification: ProjectSpecification): CompareGroup[] {
  const groupTitles = Array.from(
    new Set(specification.packages.flatMap((pkg) => pkg.groups.map((group) => group.title)))
  )

  return groupTitles.map((title) => {
    const groupsByPackage = specification.packages.map((pkg) =>
      pkg.groups.find((group) => group.title === title)
    )
    const maxRows = Math.max(...groupsByPackage.map((group) => group?.items.length || 0))

    return {
      title,
      rows: Array.from({ length: maxRows }, (_, rowIndex) => {
        const rowValues = groupsByPackage.map((group) => group?.items[rowIndex] || '')
        const normalizedValues = rowValues.map(normalize)
        const hasDifference = new Set(normalizedValues).size > 1

        return {
          key: `${title}-${rowIndex}`,
          cells: specification.packages.map((pkg, packageIndex) => {
            const text = rowValues[packageIndex]

            return {
              packageId: pkg.id,
              text,
              parts: diffText(text, rowValues),
              changed: hasDifference,
            }
          }),
        }
      }),
    }
  })
}

export default function ProjectSpecificationSection({ specification }: ProjectSpecificationSectionProps) {
  const hasPackages = specification.packages.length > 0
  const hasComparison = specification.packages.length > 1
  const comparisonGroups = buildComparisonGroups(specification)

  if (!hasPackages) return null

  return (
    <section className="px-[120px] py-6 max-xl:px-10 max-md:px-4 max-md:py-4" id="specification-details">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
          <span className="inline-flex rounded-full border border-dark/10 bg-dark/[0.03] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.14em] text-dark/55">
            Комплектация
          </span>
        </div>

        <div className="overflow-x-auto max-md:-mx-4 max-md:px-4">
          <div
            className="grid min-w-[820px] gap-3 max-md:min-w-[760px]"
            style={{ gridTemplateColumns: `repeat(${specification.packages.length}, minmax(0, 1fr))` }}
          >
            {specification.packages.map((pkg, packageIndex) => (
              <article key={pkg.id} className="flex flex-col border border-dark/15 bg-bg px-4 py-4 font-sans">
                <h3 className="mb-4 text-center font-sans text-[20px] font-medium leading-none text-dark max-md:text-[18px]">
                  {pkg.title}
                </h3>

                <div className="flex flex-col gap-3">
                  {comparisonGroups.map((group) => (
                    <div key={`${pkg.id}-${group.title}`} className="flex flex-col gap-1.5">
                      <div className="mb-0.5 inline-flex w-fit rounded-full bg-dark/[0.04] px-3 py-1 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-dark/45">
                        {group.title}
                      </div>

                      <div className="flex flex-col gap-1">
                        {group.rows.map((row) => {
                          const cell = row.cells[packageIndex]
                          const isEmpty = !cell?.text
                          const isChanged = hasComparison && cell?.changed

                          return (
                            <div
                              key={`${row.key}-${pkg.id}`}
                              className={`flex gap-2 text-[11px] leading-[1.25] ${
                                isEmpty
                                  ? 'text-dark/25'
                                  : isChanged
                                    ? 'text-dark'
                                    : 'text-dark/55'
                              }`}
                            >
                              <span
                                className={`mt-[1px] flex size-[13px] shrink-0 items-center justify-center rounded-full border text-[8px] leading-none ${
                                  isEmpty
                                    ? 'border-dark/15 text-dark/25'
                                    : isChanged
                                      ? 'border-dark bg-dark text-bg'
                                      : 'border-dark/25 text-dark/45'
                                }`}
                                aria-hidden="true"
                              >
                                {isEmpty ? '–' : '✓'}
                              </span>
                              <span className={isChanged ? '[&_strong]:rounded-[2px] [&_strong]:bg-[#fff2a8] [&_strong]:px-[2px]' : ''}>
                                {renderParts(cell?.parts || [{ text: '—', changed: false }])}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
