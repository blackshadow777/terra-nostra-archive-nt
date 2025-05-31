
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Person } from "@/types";

const AdminMigrants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data with proper Person interface
  const mockMigrants: Person[] = [
    {
      person_id: 1,
      christian_name: "Giuseppe",
      surname: "Rossi",
      fullName: "Giuseppe Rossi",
      date_of_birth: 1925,
      place_of_birth: "Venice, Italy",
      occupation: "Construction Worker",
      additional_notes: "Giuseppe Rossi arrived in Darwin in 1951 as part of the post-war migration wave.",
      reference: "REF-001",
      id_card_no: "ID-1951-001",
      has_photo: false,
      photos: [],
      family: {
        names_of_parents: "Antonio Rossi, Maria Venetian",
        names_of_children: "Carlo Rossi, Anna Rossi-Smith"
      },
      naturalization: {
        date_of_naturalisation: "1956-03-15",
        no_of_cert: "NAT-1956-0234",
        issued_at: "Darwin"
      },
      residence: {
        town_or_city: "Darwin",
        home_at_death: "15 Cavenagh Street, Darwin"
      },
      migration: {
        date_of_arrival_aus: "1951-03-10",
        date_of_arrival_nt: "1951-03-15",
        arrival_period: "Post-War",
        data_source: "National Archives"
      }
    },
    {
      person_id: 2,
      christian_name: "Maria",
      surname: "Martinez",
      fullName: "Maria Martinez",
      date_of_birth: 1928,
      place_of_birth: "Naples, Italy",
      occupation: "Teacher",
      additional_notes: "Maria Martinez was a dedicated educator in Katherine.",
      reference: "REF-002",
      id_card_no: "ID-1953-002",
      has_photo: false,
      photos: [],
      family: {
        names_of_parents: "Luigi Martinez, Rosa Napolitano",
        names_of_children: "Marco Martinez, Sofia Martinez"
      },
      naturalization: {
        date_of_naturalisation: "1958-07-20",
        no_of_cert: "NAT-1958-0445",
        issued_at: "Katherine"
      },
      residence: {
        town_or_city: "Katherine",
        home_at_death: "12 Baker Street, Katherine"
      },
      migration: {
        date_of_arrival_aus: "1953-05-20",
        date_of_arrival_nt: "1953-05-25",
        arrival_period: "Post-War",
        data_source: "Immigration Records"
      }
    },
    {
      person_id: 3,
      christian_name: "Antonio",
      surname: "Giuseppe",
      fullName: "Antonio Giuseppe",
      date_of_birth: 1930,
      place_of_birth: "Rome, Italy",
      occupation: "Engineer",
      additional_notes: "Antonio Giuseppe worked on major infrastructure projects in Alice Springs.",
      reference: "REF-003",
      id_card_no: "ID-1955-003",
      has_photo: false,
      photos: [],
      family: {
        names_of_parents: "Francesco Giuseppe, Elena Romano",
        names_of_children: "Giuseppe Jr., Anna Giuseppe"
      },
      naturalization: {
        date_of_naturalisation: "1960-04-15",
        no_of_cert: "NAT-1960-0678",
        issued_at: "Alice Springs"
      },
      residence: {
        town_or_city: "Alice Springs",
        home_at_death: "23 School Road, Alice Springs"
      },
      migration: {
        date_of_arrival_aus: "1955-08-10",
        date_of_arrival_nt: "1955-08-15",
        arrival_period: "Post-War",
        data_source: "Government Records"
      }
    },
  ];

  const filteredMigrants = mockMigrants.filter(migrant => {
    const matchesSearch = migrant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      migrant.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      migrant.residence.town_or_city.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
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
                      <TableHead className="text-slate-300">Place of Birth</TableHead>
                      <TableHead className="text-slate-300">Town/City</TableHead>
                      <TableHead className="text-slate-300">Occupation</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMigrants.map((migrant) => (
                      <TableRow key={migrant.person_id} className="border-slate-700 hover:bg-slate-700/50">
                        <TableCell className="text-white font-medium">{migrant.fullName}</TableCell>
                        <TableCell className="text-slate-300">{migrant.date_of_birth}</TableCell>
                        <TableCell className="text-slate-300">{new Date(migrant.migration.date_of_arrival_nt).getFullYear()}</TableCell>
                        <TableCell className="text-slate-300">{migrant.place_of_birth}</TableCell>
                        <TableCell className="text-slate-300">{migrant.residence.town_or_city}</TableCell>
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
