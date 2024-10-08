"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, ShoppingCart, Users, Settings, Search, MessageSquare, ChevronRight, Plus, Windows, Apple } from "lucide-react"

const games = [
  { id: 1, title: "Stray", tags: ["Cats", "Adventure", "Cyberpunk", "Atmospheric"], price: "$16.99", image: "/placeholder.svg?height=400&width=800&text=Stray", color: "from-orange-600 to-red-800", description: "Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.", os: ["windows", "apple"] },
  { id: 2, title: "Cyberpunk 2077", tags: ["RPG", "Open World", "Cyberpunk"], price: "$59.99", image: "/placeholder.svg?height=400&width=800&text=Cyberpunk+2077", color: "from-yellow-400 to-red-600", description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.", os: ["windows"] },
  { id: 3, title: "Elden Ring", tags: ["RPG", "Open World", "Dark Fantasy"], price: "$59.99", image: "/placeholder.svg?height=400&width=800&text=Elden+Ring", color: "from-yellow-600 to-red-900", description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.", os: ["windows", "apple"] },
  { id: 4, title: "Hades", tags: ["Roguelike", "Action", "Indie"], price: "$24.99", image: "/placeholder.svg?height=400&width=800&text=Hades", color: "from-red-600 to-purple-900", description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.", os: ["windows", "apple"] },
]

const popularGames = [
  { id: 1, title: "Counter-Strike: Global Offensive", image: "/placeholder.svg?height=150&width=300&text=CS:GO", tags: ["FPS", "Multiplayer", "Competitive"] },
  { id: 2, title: "Dota 2", image: "/placeholder.svg?height=150&width=300&text=Dota+2", tags: ["MOBA", "Strategy", "Multiplayer"] },
  { id: 3, title: "PUBG: BATTLEGROUNDS", image: "/placeholder.svg?height=150&width=300&text=PUBG", tags: ["Battle Royale", "Shooter", "Survival"] },
  { id: 4, title: "Apex Legends", image: "/placeholder.svg?height=150&width=300&text=Apex+Legends", tags: ["FPS", "Battle Royale", "Multiplayer"] },
  { id: 5, title: "Grand Theft Auto V", image: "/placeholder.svg?height=150&width=300&text=GTA+V", tags: ["Open World", "Action", "Multiplayer"] },
  { id: 6, title: "Team Fortress 2", image: "/placeholder.svg?height=150&width=300&text=TF2", tags: ["FPS", "Multiplayer", "Class-Based"] },
  { id: 7, title: "Rust", image: "/placeholder.svg?height=150&width=300&text=Rust", tags: ["Survival", "Crafting", "Multiplayer"] },
  { id: 8, title: "Destiny 2", image: "/placeholder.svg?height=150&width=300&text=Destiny+2", tags: ["FPS", "Looter Shooter", "Multiplayer"] },
]

const wishlistGames = [
  { id: 1, title: "Hollow Knight: Silksong", image: "/placeholder.svg?height=150&width=300&text=Silksong", tags: ["Metroidvania", "Platformer", "Indie"] },
  { id: 2, title: "Starfield", image: "/placeholder.svg?height=150&width=300&text=Starfield", tags: ["RPG", "Space", "Open World"] },
  { id: 3, title: "The Elder Scrolls VI", image: "/placeholder.svg?height=150&width=300&text=Elder+Scrolls+VI", tags: ["RPG", "Open World", "Fantasy"] },
  { id: 4, title: "Breath of the Wild 2", image: "/placeholder.svg?height=150&width=300&text=BOTW+2", tags: ["Action", "Adventure", "Open World"] },
  { id: 5, title: "Diablo IV", image: "/placeholder.svg?height=150&width=300&text=Diablo+IV", tags: ["Action RPG", "Multiplayer", "Dark Fantasy"] },
]

const topSellers = [
  { id: 1, title: "Red Dead Redemption 2", price: "$59.99", discount: "20%", image: "/placeholder.svg?height=120&width=240&text=RDR2", tags: ["Open World", "Action", "Western"] },
  { id: 2, title: "The Witcher 3: Wild Hunt", price: "$39.99", discount: "50%", image: "/placeholder.svg?height=120&width=240&text=Witcher+3", tags: ["RPG", "Open World", "Fantasy"] },
  { id: 3, title: "Valheim", price: "$19.99", image: "/placeholder.svg?height=120&width=240&text=Valheim", tags: ["Survival", "Crafting", "Multiplayer"] },
  { id: 4, title: "Stardew Valley", price: "$14.99", image: "/placeholder.svg?height=120&width=240&text=Stardew+Valley", tags: ["Farming Sim", "RPG", "Indie"] },
  { id: 5, title: "Terraria", price: "$9.99", discount: "25%", image: "/placeholder.svg?height=120&width=240&text=Terraria", tags: ["Sandbox", "Survival", "Crafting"] },
]

const categories = [
  { name: "Free to Play", image: "/placeholder.svg?height=300&width=600&text=Free+to+Play" },
  { name: "Early Access", image: "/placeholder.svg?height=300&width=600&text=Early+Access" },
  { name: "Action", image: "/placeholder.svg?height=300&width=600&text=Action" },
  { name: "Adventure", image: "/placeholder.svg?height=300&width=600&text=Adventure" },
  { name: "Casual", image: "/placeholder.svg?height=300&width=600&text=Casual" },
  { name: "Indie", image: "/placeholder.svg?height=300&width=600&text=Indie" },
  { name: "Massively Multiplayer", image: "/placeholder.svg?height=300&width=600&text=MMO" },
  { name: "Racing", image: "/placeholder.svg?height=300&width=600&text=Racing" },
  { name: "RPG", image: "/placeholder.svg?height=300&width=600&text=RPG" },
  { name: "Simulation", image: "/placeholder.svg?height=300&width=600&text=Simulation" },
  { name: "Sports", image: "/placeholder.svg?height=300&width=600&text=Sports" },
  { name: "Strategy", image: "/placeholder.svg?height=300&width=600&text=Strategy" },
]

const friends = [
  { id: 1, name: "Ryan Franci", status: "Playing GTA V", avatar: "/placeholder.svg?height=40&width=40&text=RF" },
  { id: 2, name: "Kierra Donin", status: "Online", avatar: "/placeholder.svg?height=40&width=40&text=KD" },
  { id: 3, name: "Brandon Vaccaro", status: "Offline", avatar: "/placeholder.svg?height=40&width=40&text=BV" },
]

function GameSlider({ games, title }: { games: any[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (index: number) => {
    if (sliderRef.current) {
      const scrollAmount = index * sliderRef.current.offsetWidth
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(index)
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="relative overflow-hidden">
        <div ref={sliderRef} className="flex space-x-4 overflow-x-hidden pb-4">
          {games.map((game) => (
            <div key={game.id} className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden backdrop-blur-md bg-opacity-30 group">
              <img src={game.image} alt={game.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold">{game.title}</h4>
                <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {game.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-4 bg-blue-500' : 'w-2 bg-gray-400'
              }`}
              onClick={() => scroll(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EnhancedSteamUI() {
  const [currentGame, setCurrentGame] = useState(0)

  const nextGame = () => {
    setCurrentGame((prev) => (prev + 1) % games.length)
  }

  useEffect(() => {
    const timer = setInterval(nextGame, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-screen bg-[#18181a] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 bg-opacity-30 backdrop-blur-md p-4 flex flex-col">
        <div className="mb-8">
          <img src="/placeholder.svg?height=40&width=40" alt="Steam Logo" className="w-10 h-10" />
        </div>
        <nav className="space-y-2 flex-grow">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start text-blue-400">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Store
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Library
          </Button>
        </nav>
        <Button variant="ghost" className="w-full justify-start mt-auto">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-4 flex justify-between items-center">
          <div className="flex items-center flex-1">
            <Input
              type="search"
              placeholder="Search here..."
              className="w-96 bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            />
            <Button variant="ghost" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <MessageSquare className="h-5 w-5" />
            <div className="flex items-center">
              <img src="/placeholder.svg?height=32&width=32" alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
              <span>Jakob Gouse</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </header>

        {/* Game Content */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-6">
            {/* Featured Game */}
            <div className={`relative h-96 mb-8 rounded-lg overflow-hidden bg-gradient-to-r ${games[currentGame].color}`}>
              <img
                src={games[currentGame].image}
                alt={games[currentGame].title}
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="w-2/3">
                  <div className="flex space-x-2 mb-4">
                    {games[currentGame].tags.map((tag, index) => (
                      <span key={index} className="bg-gray-800 bg-opacity-50 backdrop-blur-md text-white text-sm px-2  py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-6xl font-bold mb-2 transition-all duration-500 ease-in-out">{games[currentGame].title}</h2>
                  <p className="text-lg mb-4 transition-all duration-500 ease-in-out">{games[currentGame].description}</p>
                  <div className="flex items-center space-x-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      {games[currentGame].price} Available now
                    </Button>
                    <div className="flex items-center bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-full px-3 py-1">
                      <img src="/placeholder.svg?height=24&width=24" alt="Friend Avatar" className="w-6 h-6 rounded-full mr-2" />
                      <span className="text-sm">12 friends</span>
                    </div>
                    <div className="flex space-x-2">
                      {games[currentGame].os.includes('windows') && <Windows className="h-5 w-5" />}
                      {games[currentGame].os.includes('apple') && <Apple className="h-5 w-5" />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {games.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentGame ? 'w-8 bg-white' : 'w-2 bg-gray-400'
                    }`}
                    onClick={() => setCurrentGame(index)}
                  />
                ))}
              </div>
            </div>

            {/* Most Popular */}
            <GameSlider games={popularGames} title="Most Popular" />

            {/* Wishlist */}
            <GameSlider games={wishlistGames} title="Wishlist" />

            {/* Explore by Category */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Explore by Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden group">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        {category.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Sellers */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Top Sellers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topSellers.map((game) => (
                  <div key={game.id} className="flex bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-lg overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-24 h-full object-cover" />
                    <div className="flex-1 p-4">
                      <h4 className="font-semibold mb-1">{game.title}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        {game.discount && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">-{game.discount}</span>
                        )}
                        <span className="font-bold text-green-400">{game.price}</span>
                      </div>
                      <div className="flex flex-wrap">
                        {game.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Friends</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-lg p-4">
                    <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold">{friend.name}</h4>
                      <p className="text-sm text-gray-400">{friend.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-800 bg-opacity-30 backdrop-blur-md p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <img src="/placeholder.svg?height=40&width=40" alt="Steam Logo" className="w-10 h-10 mx-auto mb-4" />
              <p className="mb-4">© 2023 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-blue-400">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400">Legal</a>
                <a href="#" className="hover:text-blue-400">Steam Subscriber Agreement</a>
                <a href="#" className="hover:text-blue-400">Refunds</a>
              </div>
            </div>
          </footer>
        </ScrollArea>
      </div>
    </div>
  )
}
