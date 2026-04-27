'use client'

import { useState } from 'react'
import type { ProjectSpecification } from '@/data/projectSpecifications'

interface ProjectSpecificationSectionProps {
  specification: ProjectSpecification
  downloadUrl?: string
}

function slugifyId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-|-$/g, '')
}

export default function ProjectSpecificationSection({ specification, downloadUrl }: ProjectSpecificationSectionProps) {
  const [activePackageId, setActivePackageId] = useState(specification.packages[0]?.id)
  const activePackage = specification.packages.find((pkg) => pkg.id === activePackageId) || specification.packages[0]
  const hasTabs = specification.packages.length > 1

  if (!activePackage) return null

  return (
    <section className="px-[120px] py-[110px] max-md:px-6 max-md:py-16" id="specification-details">
      <div className="flex flex-col gap-10 rounded-[2px] border border-dark/10 bg-dark/[0.02] p-10 max-md:p-5">
        <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="font-sans text-sm uppercase tracking-[0.14em] text-dark/45">Комплектация</span>
            <h2 className="font-sans text-[56px] font-normal leading-[0.95] tracking-[-0.03em] text-dark max-md:text-4xl">
              Что входит в проект
            </h2>
            <p className="font-sans text-lg leading-[1.35] text-dark/65 max-md:text-base">
              Состав работ сгруппирован по разделам. Цены остаются в основном блоке проекта, здесь — только включённые позиции.
            </p>
          </div>

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center border border-dark px-5 py-3 font-sans text-base text-dark no-underline transition-colors hover:bg-dark hover:text-white max-md:w-full"
            >
              Скачать PDF
            </a>
          )}
        </div>

        {hasTabs && (
          <div
            className="flex gap-2 overflow-x-auto border-b border-dark/10 pb-2 max-md:-mx-5 max-md:px-5"
            role="tablist"
            aria-label="Комплектации проекта"
          >
            {specification.packages.map((pkg) => {
              const selected = pkg.id === activePackage.id
              return (
                <button
                  key={pkg.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`spec-package-${slugifyId(pkg.id)}`}
                  onClick={() => setActivePackageId(pkg.id)}
                  className={`shrink-0 border px-5 py-3 font-sans text-base transition-colors ${
                    selected
                      ? 'border-dark bg-dark text-white'
                      : 'border-dark/10 bg-transparent text-dark/65 hover:border-dark/40 hover:text-dark'
                  }`}
                >
                  {pkg.title}
                </button>
              )
            })}
          </div>
        )}

        <div
          id={`spec-package-${slugifyId(activePackage.id)}`}
          role={hasTabs ? 'tabpanel' : undefined}
          className="flex flex-col gap-6"
        >
          {!hasTabs && (
            <h3 className="font-sans text-2xl font-medium leading-[1.1] text-dark">{activePackage.title}</h3>
          )}

          <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
            {activePackage.groups.map((group) => (
              <article key={group.title} className="border border-dark/10 bg-bg p-6 max-md:p-5">
                <h3 className="font-sans text-xl font-medium leading-[1.1] text-dark">{group.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item, itemIndex) => (
                    <li key={`${group.title}-${itemIndex}`} className="flex gap-3 font-sans text-base leading-[1.35] text-dark/75">
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-dark/45" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
