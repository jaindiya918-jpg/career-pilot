import React from 'react';
import { Rocket, Lightbulb, Zap } from 'lucide-react';

export default function About() {
  return (
    <section className="w-full px-6 py-16 bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-xl">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">
          About Our Startup
        </h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base">
          We are building modern, scalable, and intelligent solutions that help
          businesses move faster in a digital-first world.
        </p>
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700 hover:scale-105 transition">
          <Rocket className="text-cyan-400 w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold">Fast Execution</h3>
          <p className="text-gray-400 mt-2 text-sm">
            We ship products quickly without compromising quality or performance.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700 hover:scale-105 transition">
          <Lightbulb className="text-purple-400 w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold">Innovation</h3>
          <p className="text-gray-400 mt-2 text-sm">
            We focus on creative and modern solutions to solve real-world problems.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700 hover:scale-105 transition">
          <Zap className="text-yellow-400 w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold">Scalability</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Our systems are designed to grow seamlessly with your business.
          </p>
        </div>

      </div>
    </section>
  );
}
