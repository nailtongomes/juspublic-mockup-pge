import React from 'react'
import { processosMock, notificacoesMock } from '../data/mockData'

const Header: React.FC = () => {
  const pendingNotifications = notificacoesMock.filter(n => !n.lida).length
  const urgentProcesses = processosMock.filter(p => p.status === 'Urgente').length

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pge-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">JusPublic</h1>
              <p className="text-sm text-gray-500">Sistema Integrado PGE</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5-5 5h5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              </button>
              <kbd className="absolute -top-1 -right-1 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                ⌘K
              </kbd>
            </div>

            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5-5 5h5z" />
                </svg>
              </button>
              {pendingNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingNotifications}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Dr. Carlos Silva Santos</p>
              <p className="text-xs text-gray-500">Procurador do Estado</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-pge-blue to-pge-green rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">CS</span>
            </div>
          </div>
        </div>
      </div>

      {urgentProcesses > 0 && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.662-.833-2.464 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-red-800 text-sm font-medium">
              {urgentProcesses} processo{urgentProcesses > 1 ? 's' : ''} com prioridade crítica requer{urgentProcesses === 1 ? '' : 'm'} atenção imediata
            </span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header