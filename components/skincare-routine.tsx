'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  ChevronDown,
  Droplets,
  Leaf,
  Moon,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Sun,
  Target,
  X,
  ZoomIn,
} from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  PRODUCTS,
  QUICK_REFERENCE_ROWS,
  ROUTINES,
  type Routine,
  type RoutineId,
  type RoutineStep,
} from '../lib/skincare-routine-data'

const ROUTINE_ICONS = {
  morning: Sun,
  'after-shower': ShowerHead,
  night: Moon,
  extra: Sparkles,
  pimples: Target,
}

function ProductVisual({
  productId,
  productName,
  priority = false,
  visualTitle,
  visualCaption,
  onOpen,
}: {
  productId: RoutineStep['productId']
  productName: string
  priority?: boolean
  visualTitle?: string
  visualCaption?: string
  onOpen?: (image: string, name: string, opener: HTMLButtonElement) => void
}) {
  const product = PRODUCTS[productId]

  if (!product.image) {
    return (
      <div className="product-visual product-visual-water" aria-hidden="true">
        <Droplets className="water-icon" strokeWidth={1.4} />
        <span>{visualTitle ?? 'H₂O'}</span>
        <small>{visualCaption ?? 'just water'}</small>
      </div>
    )
  }

  return (
    <button
      className="product-visual product-photo-button"
      type="button"
      aria-label={`View larger photo of ${productName}`}
      onClick={(event) => onOpen?.(product.image!, productName, event.currentTarget)}
    >
      <Image
        src={product.image}
        alt=""
        width={420}
        height={420}
        sizes={priority ? '(max-width: 760px) 70vw, 320px' : '(max-width: 640px) 104px, 140px'}
        className={product.image.endsWith('.png') ? 'product-image product-image-cutout' : 'product-image'}
        priority={priority}
      />
      <span className="zoom-badge" aria-hidden="true"><ZoomIn /></span>
    </button>
  )
}

function ProductStepCard({
  step,
  index,
  total,
  onOpen,
}: {
  step: RoutineStep
  index: number
  total: number
  onOpen: (image: string, name: string, opener: HTMLButtonElement) => void
}) {
  const product = PRODUCTS[step.productId]
  const productName = step.productName ?? product.name
  const summary = step.short ?? product.short
  const help = step.help ?? product.help
  const ingredients = step.ingredients ?? product.ingredients
  const tips = step.tips ?? (product.tip ? [{ label: 'Tip', text: product.tip }] : [])

  return (
    <li className="step-card">
      <ProductVisual
        productId={step.productId}
        productName={productName}
        visualTitle={step.visualTitle}
        visualCaption={step.visualCaption}
        onOpen={onOpen}
      />
      <div className="step-card-content">
        <div className="step-card-topline">
          <p className="step-action">
            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
            <span>{step.action}{step.optional && <span className="optional-tag">Optional</span>}</span>
          </p>
          <span className="step-count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <h3 className="product-name">{productName}</h3>
        <p className="product-summary">{summary}</p>
        {ingredients && (
          <ul className="ingredient-list" aria-label="Highlighted ingredients">
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        )}
        <details className="product-help">
          <summary>
            <span>How it helps</span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <p>{help}</p>
        </details>
        {tips.map((tip) => (
          <p className="product-tip" key={`${tip.label}-${tip.text}`}>
            <strong>{tip.label}</strong>
            <span>{tip.text}</span>
          </p>
        ))}
      </div>
    </li>
  )
}

function RoutineOverview({ routine }: { routine: Routine }) {
  return (
    <aside className="routine-overview" aria-label="Routine at a glance">
      <div className="overview-heading">
        <div>
          <p className="eyebrow overview-eyebrow">AT A GLANCE</p>
          <h3>{routine.title}</h3>
        </div>
        <span className="step-total">{routine.steps.length} steps</span>
      </div>
      <ol className="overview-steps">
        {routine.steps.map((step, index) => (
          <li key={`${step.productId}-${index}`}>
            <span className="overview-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="overview-step-copy">
              <strong>{step.action}</strong>
              <span>{step.short ?? PRODUCTS[step.productId].short}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="overview-reminder">
        <ShieldCheck aria-hidden="true" />
        <div>
          <strong>A gentle reminder</strong>
          <p>{routine.overviewNote}</p>
        </div>
      </div>
      <p className="overview-caption">
        <Leaf aria-hidden="true" />
        Small, steady steps are enough.
      </p>
    </aside>
  )
}

function RoutineNote({ routine }: { routine: Routine }) {
  if (!routine.note?.length) return null

  return (
    <aside className="routine-note" aria-label="Good to know">
      <div className="note-heading">
        <span className="note-mark"><Sparkles aria-hidden="true" /></span>
        <strong>Good to know</strong>
      </div>
      <ul>
        {routine.note.map((note) => <li key={note}>{note}</li>)}
      </ul>
    </aside>
  )
}

function QuickReference() {
  return (
    <section id="quick-reference" className="quick-reference" aria-labelledby="reference-title">
      <div className="reference-heading">
        <div>
          <p className="eyebrow">SAVE FOR LATER</p>
          <h2 id="reference-title">Your routine, at a glance</h2>
          <p>See what changes — and what stays the same — from one routine to another.</p>
        </div>
        <span className="reference-mark" aria-hidden="true"><Leaf /></span>
      </div>
      <p className="scroll-hint">Swipe horizontally to compare all five routines.</p>
      <div className="reference-table-wrap" role="region" aria-label="Routine comparison table" tabIndex={0}>
        <table className="reference-table">
          <caption className="sr-only">Products used for each step in the morning, after-shower, night, extra-time, and pimple-night routines.</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Morning</th>
              <th scope="col">After shower</th>
              <th scope="col">Night</th>
              <th scope="col">Extra-time night</th>
              <th scope="col">Pimple night</th>
            </tr>
          </thead>
          <tbody>
            {QUICK_REFERENCE_ROWS.map((row) => (
              <tr key={row.step}>
                <th scope="row">{row.step}</th>
                <td>{row.morning}</td>
                <td>{row.afterShower}</td>
                <td>{row.night}</td>
                <td>{row.extra}</td>
                <td>{row.pimples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function SkincareRoutine() {
  const [activeRoutineId, setActiveRoutineId] = useState<RoutineId>('morning')
  const [zoomedProduct, setZoomedProduct] = useState<{ image: string; name: string } | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const activeRoutine = ROUTINES.find((routine) => routine.id === activeRoutineId) ?? ROUTINES[0]

  useEffect(() => {
    if (!zoomedProduct) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [zoomedProduct])

  function openProductZoom(image: string, name: string, opener: HTMLButtonElement) {
    openerRef.current = opener
    setZoomedProduct({ image, name })
  }

  function closeProductZoom() {
    setZoomedProduct(null)
    openerRef.current?.focus()
  }

  function handleZoomKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeProductZoom()
      return
    }

    if (event.key !== 'Tab') return
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % ROUTINES.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + ROUTINES.length) % ROUTINES.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = ROUTINES.length - 1

    if (nextIndex !== undefined) {
      event.preventDefault()
      const nextRoutine = ROUTINES[nextIndex]
      setActiveRoutineId(nextRoutine.id)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  function selectRoutine(routineId: RoutineId) {
    setActiveRoutineId(routineId)
  }

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Violet's Skincare Corner, back to top">
          <span className="brand-mark"><Leaf aria-hidden="true" /></span>
          <span className="brand-name">Violet&apos;s <span>Skincare Corner</span></span>
        </a>
        <nav className="site-nav" aria-label="Page navigation">
          <a href="#routine">The routine</a>
          <a href="#quick-reference">Quick reference</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL SKINCARE GUIDE</p>
            <h1 id="page-title">My skincare<br /><em>routine.</em></h1>
            <p className="hero-description">
              A simple, hydrating, brightening routine, with extra steps for nights when there is time or pimples show up.
            </p>
            <a className="hero-link" href="#routine">
              Explore your routine <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="hero-facts" aria-label="Routine details">
              <span><strong>05</strong> routine paths</span>
              <span className="fact-divider" aria-hidden="true" />
              <span><strong>01</strong> simple starting point</span>
            </div>
          </div>
          <div className="hero-feature">
            <div className="hero-product-frame">
              <div className="hero-product-backdrop" aria-hidden="true" />
              <span className="spf-badge">SPF<br /><strong>50+</strong></span>
              <Image
                src={PRODUCTS.aqua.image!}
                alt={`${PRODUCTS.aqua.name} bottle`}
                width={420}
                height={420}
                sizes="(max-width: 760px) 72vw, 340px"
                className="hero-product-image"
                priority
              />
            </div>
            <div className="hero-feature-copy">
              <span className="feature-kicker"><ShieldCheck aria-hidden="true" /> AM ESSENTIAL</span>
              <strong>Finish with sunscreen.</strong>
              <span>Protect the work your routine is doing.</span>
            </div>
          </div>
        </div>
      </section>

      <main id="main-content" className="page-content">
        <section id="routine" className="routine-section" aria-labelledby="routine-section-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A LITTLE CARE, EVERY DAY</p>
              <h2 id="routine-section-title">Choose your moment</h2>
              <p>Follow the steps in order, and keep the routine that fits today.</p>
            </div>
            <span className="section-badge"><Droplets aria-hidden="true" /> Hydrate · brighten · protect</span>
          </div>

          <div className="routine-layout">
            <div className="routine-main-column">
              <div className="routine-tabs" role="tablist" aria-label="Choose a skincare routine">
                {ROUTINES.map((routine, index) => {
                  const Icon = ROUTINE_ICONS[routine.id]
                  const selected = routine.id === activeRoutineId

                  return (
                    <button
                      key={routine.id}
                      ref={(element) => { tabRefs.current[index] = element }}
                      id={`routine-tab-${routine.id}`}
                      className="routine-tab"
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="routine-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => selectRoutine(routine.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{routine.tabLabel}</span>
                    </button>
                  )
                })}
              </div>

              <section
                id="routine-panel"
                className="routine-panel"
                role="tabpanel"
                aria-labelledby={`routine-tab-${activeRoutine.id}`}
                tabIndex={0}
              >
                <div className="routine-panel-heading">
                  <div>
                    <p className="eyebrow">{activeRoutine.kicker}</p>
                    <h2>{activeRoutine.title}</h2>
                    <p>{activeRoutine.intro}</p>
                  </div>
                  <span className="routine-step-count">{activeRoutine.steps.length} steps</span>
                </div>
                <ol className="routine-steps">
                  {activeRoutine.steps.map((step, index) => (
                    <ProductStepCard key={`${activeRoutine.id}-${step.productId}-${index}`} step={step} index={index} total={activeRoutine.steps.length} onOpen={openProductZoom} />
                  ))}
                </ol>
                <RoutineNote routine={activeRoutine} />
              </section>
            </div>
            <RoutineOverview routine={activeRoutine} />
          </div>
        </section>

        <QuickReference />
      </main>

      {zoomedProduct && (
        <div className="zoom-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeProductZoom()
        }}>
          <div className="zoom-dialog" role="dialog" aria-modal="true" aria-label={`Larger photo of ${zoomedProduct.name}`} onKeyDown={handleZoomKeyDown}>
            <button ref={closeButtonRef} className="zoom-close" type="button" aria-label="Close larger photo" onClick={closeProductZoom}>
              <X aria-hidden="true" />
            </button>
            <Image src={zoomedProduct.image} alt={zoomedProduct.name} width={560} height={560} className="zoom-image" />
            <p className="zoom-caption">{zoomedProduct.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
