import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



export default function Barra_Menu() {
  return (
    <div>
      <nav className="flex flex-col gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className=" h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">Portaria</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-2xl">Portaria</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="Drop-Item">
                Cartão Portaria
              </DropdownMenuItem>
              <DropdownMenuItem className="Drop-Item">
                Visitantes
              </DropdownMenuItem>
              <DropdownMenuItem className="Drop-Item">
                Fornecedores
              </DropdownMenuItem>
              <DropdownMenuItem className="Drop-Item">
                Colaboradores Moreno
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-50 h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">Administrador</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-2xl">Administrador</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="Drop-Item">
                Cartão Moreno
              </DropdownMenuItem>
              <DropdownMenuItem className="Drop-Item">
                Colaboradores Moreno
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  )
}
