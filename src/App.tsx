import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import ProcessViewer from './components/processes/ProcessViewer'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Processo } from './types'

type ActiveView = 'dashboard' | 'process'

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [selectedProcess, setSelectedProcess] = useState<Processo | null>(null)

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view)
  }

  const handleProcessSelect = (process: Processo) => {
    setSelectedProcess(process)
    setActiveView('process')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {activeView === 'dashboard' && (
            <Dashboard onProcessSelect={handleProcessSelect} />
          )}
          
          {activeView === 'process' && selectedProcess && (
            <ProcessViewer process={selectedProcess} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App