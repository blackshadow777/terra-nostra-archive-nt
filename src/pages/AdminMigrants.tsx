
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Migrant } from "@/types";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminMigrants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOccupation, setSearchOccupation] = useState("");
  
  const [migrants, setMigrants] = useState<Migrant[]>([
    { id: 5201, fullName: "dmans mark", birthYear: 2025, birthPlace: "dansd", occupation: "kadsnda", arrivalYear: 2025, region: "Veneto", settlement: "Darwin", hasPhoto: false },
    { id: 256, fullName: "Donato Petrilli", birthYear: 1920, birthPlace: "Naples", occupation: "Welder", arrivalYear: 1974, region: "Campania", settlement: "Katherine", hasPhoto: false },
    { id: 512, fullName: "Lesley Phillippa Vita", birthYear: 1925, birthPlace: "Rome", occupation: "Home Duties", arrivalYear: 1974, region: "Lazio", settlement: "Darwin", hasPhoto: false },
    { id: 768, fullName: "Mario Isatti", birthYear: 1922, birthPlace: "Milan", occupation: "", arrivalYear: 1974, region: "Lombardy", settlement: "Alice Springs", hasPhoto: false },
    { id: 1024, fullName: "Concetta Mercorella", birthYear: 1930, birthPlace: "Bari", occupation: "", arrivalYear: 1974, region: "Puglia", settlement: "Tennant Creek", hasPhoto: false },
    { id: 1280, fullName: "Bruno Niceforo", birthYear: 1928, birthPlace: "Palermo", occupation: "Shop Proprietor", arrivalYear: 1974, region: "Sicily", settlement: "Katherine", hasPhoto: false },
    { id: 1536, fullName: "Bradden Arthur Bellette", birthYear: 1940, birthPlace: "Venice", occupation: "Fireman", arrivalYear: 1975, region: "Veneto", settlement: "Darwin", hasPhoto: false },
    { id: 1792, fullName: "Margaret Ann Zerna", birthYear: 1935, birthPlace: "Florence", occupation: "Teacher", arrivalYear: 1975, region: "Tuscany", settlement: "Alice Springs", hasPhoto: false },
    { id: 2048, fullName: "Rosita Delores Cigobia", birthYear: 1945, birthPlace: "Bologna", occupation: "Public Servant", arrivalYear: 1975, region: "Emilia-Romagna", settlement: "Katherine", hasPhoto: false },
    { id: 2304, fullName: "Violet Lillian Del Baldori", birthYear: 1950, birthPlace: "Genoa", occupation: "", arrivalYear: 1975, region: "Liguria", settlement: "Darwin", hasPhoto: false },
  ]);

  const filteredMigrants = migrants.filter(migrant => {
    const matchesName = migrant.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOccupation = migrant.occupation.toLowerCase().includes(searchOccupation.toLowerCase());
    return matchesName && matchesOccupation;
  });

  const handleDeleteMigrant = (id: number) => {
    setMigrants(migrants.filter(migrant => migrant.id !== id));
    toast({
      title: "Migrant Deleted",
      description: "Migrant record has been removed successfully.",
    });
  };

  const formatDate = (day: number, month: number, year: number) => {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  };

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-white hover:bg-slate-700"
              >
                <Search className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Migrants Management</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-900">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-white">Migrants Database</h1>
            <div className="flex justify-between items-center">
              <p className="text-slate-400">Manage migrant records and information</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Migrant
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Search Full Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Search Occupation"
                    value={searchOccupation}
                    onChange={(e) => setSearchOccupation(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Apply Filters
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700">
                      <TableHead className="text-slate-300">
                        <input type="checkbox" className="rounded" />
                      </TableHead>
                      <TableHead className="text-slate-300">ID</TableHead>
                      <TableHead className="text-slate-300">Full Name</TableHead>
                      <TableHead className="text-slate-300">Date of Birth</TableHead>
                      <TableHead className="text-slate-300">Place of Birth</TableHead>
                      <TableHead className="text-slate-300">Occupation</TableHead>
                      <TableHead className="text-slate-300">Date of Arrival NT</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMigrants.map((migrant) => (
                      <TableRow key={migrant.id} className="border-slate-700 hover:bg-slate-700">
                        <TableCell>
                          <input type="checkbox" className="rounded" />
                        </TableCell>
                        <TableCell className="text-slate-300">{migrant.id}</TableCell>
                        <TableCell className="text-white font-medium">{migrant.fullName}</TableCell>
                        <TableCell className="text-slate-300">
                          {migrant.birthYear ? formatDate(27, 5, migrant.birthYear) : '-'}
                        </TableCell>
                        <TableCell className="text-slate-300">{migrant.birthPlace || 'dansd'}</TableCell>
                        <TableCell className="text-slate-300">{migrant.occupation || '-'}</TableCell>
                        <TableCell className="text-slate-300">
                          {migrant.arrivalYear ? formatDate(24, 12, migrant.arrivalYear) : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteMigrant(migrant.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
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
