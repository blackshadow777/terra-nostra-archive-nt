
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/apiService";

const AdminMigrants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: persons = [], isLoading } = useQuery({
    queryKey: ['persons', 'all'],
    queryFn: () => ApiService.getAllPersons(),
    select: (response) => response.data,
  });

  const filteredPersons = persons.filter(person => 
    person.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.residence.town_or_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-slate-400 py-8">
                          Loading migrants...
                        </TableCell>
                      </TableRow>
                    ) : filteredPersons.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-slate-400 py-8">
                          No migrants found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPersons.map((person) => (
                        <TableRow key={person.person_id} className="border-slate-700 hover:bg-slate-700/50">
                          <TableCell className="text-white font-medium">{person.fullName}</TableCell>
                          <TableCell className="text-slate-300">{person.date_of_birth}</TableCell>
                          <TableCell className="text-slate-300">{new Date(person.migration.date_of_arrival_nt).getFullYear()}</TableCell>
                          <TableCell className="text-slate-300">{person.place_of_birth}</TableCell>
                          <TableCell className="text-slate-300">{person.residence.town_or_city}</TableCell>
                          <TableCell className="text-slate-300">{person.occupation}</TableCell>
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
                      ))
                    )}
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
