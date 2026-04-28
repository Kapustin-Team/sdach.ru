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

export default function ProjectSpecificationSection({ specification, downloadUrl }: ProjectSpecificationSectionProps) {
  const hasPackages = specification.packages.length > 0
  const hasComparison = specification.packages.length > 1
  const comparisonGroups = buildComparisonGroups(specification)

  if (!hasPackages) return null

  return (
    <section className="px-[120px] py-2 max-xl:px-10 max-md:px-4 max-md:py-6" id="specification-details">
      <div className="flex flex-col gap-1 rounded-[2px] border border-dark/10 bg-dark/[0.02] p-2 max-md:p-2">
        <div className="flex items-center justify-between gap-2 border-b border-dark/10 pb-1 max-md:flex-col max-md:items-stretch">
          <span className="font-sans text-[9px] uppercase tracking-[0.1em] text-dark/45">Комплектация</span>

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center border border-dark px-3 py-1.5 font-sans text-xs text-dark no-underline transition-colors hover:bg-dark hover:text-white max-md:w-full"
            >
              Скачать PDF
            </a>
          )}
        </div>

        <div className="overflow-x-auto max-md:-mx-4 max-md:px-4">
          <div
            className="grid min-w-[760px] gap-1 max-md:min-w-[720px]"
            style={{ gridTemplateColumns: `repeat(${specification.packages.length}, minmax(0, 1fr))` }}
          >
            {specification.packages.map((pkg) => (
              <div key={pkg.id} className="sticky top-0 z-10 border border-dark/10 bg-[#f6f1e9] px-2.5 py-1.5">
                <h3 className="font-sans text-[13px] font-medium leading-[1.05] text-dark max-md:text-xs">{pkg.title}</h3>
              </div>
            ))}

            {comparisonGroups.map((group) => (
              <div key={group.title} className="contents">
                <div
                  className="col-span-full mt-0.5 border-y border-dark/10 bg-dark/[0.04] px-2.5 py-1 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.06em] text-dark/70"
                  style={{ gridColumn: `1 / span ${specification.packages.length}` }}
                >
                  {group.title}
                </div>

                {group.rows.map((row) =>
                  row.cells.map((cell) => (
                    <div
                      key={`${row.key}-${cell.packageId}`}
                      className={`min-h-[20px] border border-dark/10 bg-bg px-2 py-1 font-sans text-[10px] leading-[1.12] text-dark/75 ${
                        hasComparison && cell.changed ? 'bg-[#fff8df] text-dark' : ''
                      }`}
                    >
                      {renderParts(cell.parts)}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
