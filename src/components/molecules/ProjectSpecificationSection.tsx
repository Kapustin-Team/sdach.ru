'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
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

function normalizeForCompare(value: string) {
  return value
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(\d+)\s+(мм|см|м²|м2|м)/g, '$1$2')
    .replace(/[.,;:()\-—–/\s]/g, '')
}

function diffText(value: string, rowValues: string[]): TextPart[] {
  if (!value) return [{ text: '—', changed: false }]

  const normalizedValues = rowValues.map(normalizeForCompare)
  const uniqueValues = new Set(normalizedValues.filter(Boolean))

  if (uniqueValues.size <= 1) {
    return [{ text: value, changed: false }]
  }

  const tokens = tokenize(value)
  const tokenValues = tokens.map(normalizeForCompare)
  const otherTokenLists = rowValues
    .filter((rowValue) => normalizeForCompare(rowValue) !== normalizeForCompare(value))
    .map((rowValue) => tokenize(rowValue).map(normalizeForCompare))

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
  const groupMap = new Map<string, { title: string; groupsByPackage: string[][] }>()

  specification.packages.forEach((pkg, packageIndex) => {
    pkg.groups.forEach((group) => {
      const groupKey = normalizeForCompare(group.title)
      const current = groupMap.get(groupKey) || {
        title: group.title,
        groupsByPackage: specification.packages.map(() => []),
      }

      current.groupsByPackage[packageIndex].push(...group.items)
      groupMap.set(groupKey, current)
    })
  })

  return Array.from(groupMap.values()).map(({ title, groupsByPackage }) => {
    const rowKeys: string[] = []

    groupsByPackage.forEach((items) => {
      items.forEach((item) => {
        const itemKey = normalizeForCompare(item)
        if (itemKey && !rowKeys.includes(itemKey)) rowKeys.push(itemKey)
      })
    })

    return {
      title,
      rows: rowKeys.map((rowKey) => {
        const rowValues = groupsByPackage.map((items) =>
          items.find((item) => normalizeForCompare(item) === rowKey) || ''
        )
        const hasDifference = new Set(rowValues.map(normalizeForCompare).filter(Boolean)).size > 1

        return {
          key: `${title}-${rowKey}`,
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
  const [mobileOpenPackages, setMobileOpenPackages] = useState<Record<string, boolean>>({})
  const hasPackages = specification.packages.length > 0
  const hasComparison = specification.packages.length > 1
  const comparisonGroups = buildComparisonGroups(specification)

  const toggleMobilePackage = (packageId: string) => {
    setMobileOpenPackages((current) => ({
      ...current,
      [packageId]: !current[packageId],
    }))
  }

  if (!hasPackages) return null

  return (
    <section className="px-[120px] pt-[34px] pb-6 max-xl:px-10 max-md:px-4 max-md:pt-7 max-md:pb-4" id="specification-details">
      <div className="flex flex-col gap-[34px] max-md:gap-6">
        <div
          id="project-specification-packages"
          className="overflow-x-auto max-md:mx-2 max-md:overflow-visible"
        >
          <div
            className="grid gap-3 md:min-w-[820px] md:py-1 md:[grid-template-columns:repeat(var(--package-count),minmax(0,1fr))] max-md:grid-cols-1"
            style={{ '--package-count': specification.packages.length } as CSSProperties}
          >
            {specification.packages.map((pkg, packageIndex) => {
              const isPackageOpen = Boolean(mobileOpenPackages[pkg.id])
              const contentId = `project-specification-package-${pkg.id}`

              return (
                <article
                  key={pkg.id}
                  className="flex flex-col border border-dark/15 bg-bg px-4 py-4 font-sans transition-[transform,border-color,box-shadow] duration-300 ease-out md:hover:-translate-y-1 md:hover:border-dark/25 md:hover:shadow-[0_18px_42px_rgba(31,25,18,0.08)] max-md:px-3 max-md:py-3"
                >
                  <div className="mb-4 flex items-center justify-between gap-3 max-md:mb-0">
                    <h3 className="text-left font-sans text-[20px] font-medium leading-none text-dark max-md:text-[17px]">
                      {pkg.title}
                    </h3>

                    <button
                      type="button"
                      className="inline-flex shrink-0 items-center gap-2 border border-[#8A6A3F]/25 bg-[#8A6A3F]/10 px-3 py-2 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-[#8A6A3F] transition-colors duration-300 hover:bg-[#8A6A3F]/15 md:hidden"
                      aria-expanded={isPackageOpen}
                      aria-controls={contentId}
                      onClick={() => toggleMobilePackage(pkg.id)}
                    >
                      <span>{isPackageOpen ? 'Скрыть' : 'Показать'}</span>
                      <span className="text-[14px] leading-none" aria-hidden="true">
                        {isPackageOpen ? '−' : '+'}
                      </span>
                    </button>
                  </div>

                  <div id={contentId} className={`flex flex-col gap-3 ${isPackageOpen ? '' : 'max-md:hidden'}`}>
                    {comparisonGroups.map((group) => {
                      const packageHasGroupContent = group.rows.some((row) => row.cells[packageIndex]?.text)

                      if (!packageHasGroupContent) return null

                      return (
                        <div key={`${pkg.id}-${group.title}`} className="flex flex-col gap-1.5">
                          <div className="mb-0.5 inline-flex w-fit border border-dark/10 bg-dark/[0.03] px-3 py-1 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-dark/45">
                            {group.title}
                          </div>

                          <div className="flex flex-col gap-1">
                            {group.rows.map((row) => {
                              const cell = row.cells[packageIndex]
                              const isChanged = hasComparison && cell?.changed

                              if (!cell?.text) return null

                              return (
                                <div
                                  key={`${row.key}-${pkg.id}`}
                                  className={`grid grid-cols-[5px_minmax(0,1fr)] items-start gap-2 text-[11px] leading-[1.25] ${
                                    isChanged ? 'text-dark' : 'text-dark/55'
                                  }`}
                                >
                                  <span
                                    className={`mt-[5px] h-[5px] w-[5px] shrink-0 ${isChanged ? 'bg-dark' : 'bg-dark/35'}`}
                                    aria-hidden="true"
                                  />
                                  <span className="min-w-0">{renderParts(cell.parts)}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
