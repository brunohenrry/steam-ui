"use client"

import { useState } from "react"
import { Menu, Search, ShoppingCart, User, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const games = [
  { id: 1, title: "Cyberpunk 2077", image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "The Witcher 3", image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Red Dead Redemption 2", image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Grand Theft Auto V", image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Elden Ring", image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Hades", image: "/placeholder.svg?height=200&width=300" },
]

export default function SteamInspiredUI() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % games.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + games.length) % games.length)
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">v0 Games</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Menu className="mr-2 h-4 w-4" />
                Library
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Store
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Community
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search games..."
              className="w-64 bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            />
            <Button variant="ghost" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Game Content */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-6">
            {/* Featured Game Banner */}
            <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
              <img
                src={games[currentSlide].image}
                alt={games[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-3xl font-bold">{games[currentSlide].title}</h2>
                <p className="text-gray-300">Featured Game</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={nextSlide}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {/* Game Grid */}
            <h3 className="text-2xl font-bold mb-4">Your Library</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img src={game.image} alt={game.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold">{game.title}</h4>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
