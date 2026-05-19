import React from 'react'

function FeatureCard({feature}) {
    return (
        <div key={feature.title} className="w-full bg-white p-6 rounded-lg shadow-md">
            <feature.icon className="w-12 h-12 text-orange-600 mb-4 inline-flex justify-center" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
        </div>
    )
}

export default FeatureCard