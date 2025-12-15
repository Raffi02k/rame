import { Link } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent } from "../components/card"
import { Button } from "../components/button"
import { UserCircle, Users, Heart } from "lucide-react"

export default function LoginPage() {
  const [showRoleSelect, setShowRoleSelect] = useState(false)

  // ====== STEG 1: INLOGGNING ======
  if (!showRoleSelect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c5f7c] to-[#1a4d66] p-4">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Logo / ikon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>

              {/* Titel och undertitel */}
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Autopilot Planner
                </h1>
                <p className="text-muted-foreground mt-1">
                  Trollhättans Stad
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-[0.2em]">
                  Demo · Prototyp
                </p>
              </div>

              {/* Inloggningsfält */}
              <div className="space-y-4 pt-4">
                <div className="space-y-3 text-left">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Användarnamn
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="ex. fornamn.efternamn"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Lösenord
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Knapp + liten hjälptext */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    className="w-full py-6 text-base font-semibold tracking-wide"
                    onClick={() => setShowRoleSelect(true)}
                  >
                    Logga in
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Detta är en demosida – inloggningen är endast för att visa
                    flödet.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ====== STEG 2: VÄLJ ROLL ======
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c5f7c] to-[#1a4d66] p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Välj din roll
          </h1>
          <p className="text-white/80 text-sm">
            Hur vill du använda systemet idag?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ADMIN */}
          <Link to="/admin" className="block h-full">
            <Card className="hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] h-full border-none">
              <CardContent className="p-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-[#8b5cf6]/10 rounded-full flex items-center justify-center">
                    <UserCircle className="w-12 h-12 text-[#8b5cf6]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Admin</h2>
                  <p className="text-muted-foreground text-sm leading-snug">
                    Planera och fördela uppgifter för hela verksamheten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* PERSONAL */}
          <Link to="/personal" className="block h-full">
            <Card className="hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] h-full border-none">
              <CardContent className="p-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-[#3b82f6]/10 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#3b82f6]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Personal</h2>
                  <p className="text-muted-foreground text-sm leading-snug">
                    Se din dag, följ dina arbetsuppgifter.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* BRUKARE */}
          <Link to="/brukare" className="block h-full">
            <Card className="hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] h-full border-none">
              <CardContent className="p-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-[#10b981]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Brukare</h2>
                  <p className="text-muted-foreground text-sm leading-snug">
                    Se vad som händer idag och vem som är på plats.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
