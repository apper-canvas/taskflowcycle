import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-6 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gradient-to-r from-primary-200 to-primary-300 rounded-lg animate-pulse"></div>
      </div>

      {/* Search bar skeleton */}
      <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl animate-pulse"></div>

      {/* Task cards skeleton */}
      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="card-premium p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-6 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse ml-8"></div>
                <div className="flex items-center space-x-4 ml-8">
                  <div className="h-6 w-20 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full animate-pulse"></div>
                  <div className="h-6 w-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading