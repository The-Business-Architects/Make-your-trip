'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface Option<T extends string = string> {
  value: T
  label: string
  badgeColor?: string
  badgeBg?: string
}

interface CustomSelectProps<T extends string = string> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  placeholder?: string
  size?: 'sm' | 'md'
  className?: string
}

export default function CustomSelect<T extends string = string>({
  value,
  options,
  onChange,
  placeholder = 'Select option',
  size = 'md',
  className = '',
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const isSmall = size === 'sm'

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        userSelect: 'none',
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          background: '#ffffff',
          border: isOpen ? '1px solid #1a56db' : '1px solid #cbd5e1',
          borderRadius: isSmall ? '8px' : '10px',
          padding: isSmall ? '6px 10px' : '9px 12px',
          fontSize: isSmall ? '12px' : '13px',
          fontWeight: 500,
          color: '#0a1628',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(26, 86, 219, 0.12)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? (
            <>
              {selectedOption.badgeBg && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: selectedOption.badgeBg,
                    flexShrink: 0,
                  }}
                />
              )}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span style={{ color: '#94a3b8' }}>{placeholder}</span>
          )}
        </span>

        {/* Chevron Icon */}
        <svg
          width={isSmall ? '12' : '14'}
          height={isSmall ? '12' : '14'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            color: '#64748b',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s ease',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 150,
            background: '#ffffff',
            border: '1px solid rgba(26, 86, 219, 0.18)',
            borderRadius: '10px',
            boxShadow: '0 12px 30px rgba(10, 22, 40, 0.15), 0 4px 10px rgba(0,0,0,0.05)',
            maxHeight: '230px',
            overflowY: 'auto',
            padding: '4px',
            animation: 'fadeIn 120ms ease-out',
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                style={{
                  padding: isSmall ? '6px 10px' : '8px 12px',
                  borderRadius: '6px',
                  fontSize: isSmall ? '12px' : '13px',
                  fontWeight: isSelected ? 500 : 400,
                  color: isSelected ? '#1a56db' : '#1e293b',
                  background: isSelected ? 'rgba(26, 86, 219, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  transition: 'background-color 0.1s',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(26, 86, 219, 0.04)'
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  {option.badgeBg && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: option.badgeBg,
                      }}
                    />
                  )}
                  <span>{option.label}</span>
                </div>

                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
