import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Migrant } from "@/types";

const AdminMigrants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data with proper Migrant interface
  const mockMigrants: Migrant[] = [
    {
      id: 1,
      firstName: "Giuseppe",
      lastName: "Rossi",
      fullName: "Giuseppe Rossi",
      birthYear: 1925,
      birthPlace: "Venice, Italy",
      occupation: "Construction Worker",
      arrivalYear: 1951,
      region: "Veneto",
      settlement: "Darwin",
      hasPhoto: false,
      photos: [],
      biography: "Giuseppe Rossi arrived in Darwin in 1951 as part of the post-war migration wave.",
      family: {
        parents: "Antonio Rossi, Maria Venetian",
        children: "Carlo Rossi, Anna Rossi-Smith"
      },
      naturalization: {
        date: "1956-03-15",
        certificate: "NAT-1956-0234",
        issuedAt: "Darwin"
      },
      residence: {
        townOrCity: "Darwin",
        homeAtDeath: "15 Cavenagh Street, Darwin"
      }
    },
    {
      id: 2,
      firstName: "Maria",
      lastName: "Martinez",
      fullName: "Maria Martinez",
      birthYear: 1928,
      birthPlace: "Naples, Italy",
      occupation: "Teacher",
      arrivalYear: 1953,
      region: "Campania",
      settlement: "Katherine",
      hasPhoto: false,
      photos: [],
      biography: "Maria Martinez was a dedicated educator in Katherine.",
      family: {
        parents: "Luigi Martinez, Rosa Napolitano",
        children: "Marco Martinez, Sofia Martinez"
      },
      naturalization: {
        date: "1958-07-20",
        certificate: "NAT-1958-0445",
        issuedAt: "Katherine"
      },
      residence: {
        townOrCity: "Katherine",
        homeAtDeath: "12 Baker Street, Katherine"
      }
    },
    {
      id: 3,
      firstName: "Antonio",
      lastName: "Giuseppe",
      fullName: "Antonio Giuseppe",
      birthYear: 1930,
      birthPlace: "Rome, Italy",
      occupation: "Engineer",
      arrivalYear: 1955,
      region: "Lazio",
      settlement: "Alice Springs",
      hasPhoto: false,
      photos: [],
      biography: "Antonio Giuseppe worked on major infrastructure projects in Alice Springs.",
      family: {
        parents: "Francesco Giuseppe, Elena Romano",
        children: "Giuseppe Jr., Anna Giuseppe"
      },
      naturalization: {
        date: "1960-04-15",
        certificate: "NAT-1960-0678",
        issuedAt: "Alice Springs"
      },
      residence: {
        townOrCity: "Alice Springs",
        homeAtDeath: "23 School Road, Alice Springs"
      }
    },
  ];

  const filteredMigrants = mockMigrants.filter(migrant => {
    const matchesSearch = migrant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      migrant.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      migrant.settlement.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Migrants Management</h1>
            <p className="text-slate-400">Manage Italian migrants database records</p>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="border-b border-slate-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-white">Migrants Database</CardTitle>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Migrant
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search migrants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Birth Year</TableHead>
                      <TableHead className="text-slate-300">Arrival Year</TableHead>
                      <TableHead className="text-slate-300">Region</TableHead>
                      <TableHead className="text-slate-300">Settlement</TableHead>
                      <TableHead className="text-slate-300">Occupation</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMigrants.map((migrant) => (
                      <TableRow key={migrant.id} className="border-slate-700 hover:bg-slate-700/50">
                        <TableCell className="text-white font-medium">{migrant.fullName}</TableCell>
                        <TableCell className="text-slate-300">{migrant.birthYear}</TableCell>
                        <TableCell className="text-slate-300">{migrant.arrivalYear}</TableCell>
                        <TableCell className="text-slate-300">{migrant.region}</TableCell>
                        <TableCell className="text-slate-300">{migrant.settlement}</TableCell>
                        <TableCell className="text-slate-300">{migrant.occupation}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-700">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-slate-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminMigrants;
