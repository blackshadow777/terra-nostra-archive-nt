
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Camera, Calendar } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import MigrantFilters from "@/components/admin/MigrantFilters";
import AddMigrantDialog from "@/components/admin/AddMigrantDialog";
import { useMigrants, useMigrantMutations } from "@/hooks/useMigrants";
import { FilterOptions, SortOption, MigrantQueryParams } from "@/types/admin";
import { Person } from "@/types";

const AdminMigrants = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [sort, setSort] = useState<SortOption>({ field: 'fullName', direction: 'asc' });

  const queryParams: MigrantQueryParams = {
    page: currentPage,
    limit: 20,
    filters,
    sort,
  };

  const { data: migrantsData, isLoading } = useMigrants(queryParams);
  const { deleteMigrant } = useMigrantMutations();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this migrant record?')) {
      await deleteMigrant.mutateAsync(id);
    }
  };

  const handleResetFilters = () => {
    setFilters({});
    setSort({ field: 'fullName', direction: 'asc' });
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).getFullYear().toString();
    } catch {
      return dateString;
    }
  };

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

          <div className="space-y-6">
            {/* Filters */}
            <MigrantFilters
              filters={filters}
              sort={sort}
              onFiltersChange={setFilters}
              onSortChange={setSort}
              onReset={handleResetFilters}
            />

            {/* Main Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="border-b border-slate-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-white">Migrants Database</CardTitle>
                    {migrantsData && (
                      <p className="text-slate-400 text-sm mt-1">
                        Showing {migrantsData.data.length} of {migrantsData.total} records
                      </p>
                    )}
                  </div>
                  <Button 
                    onClick={() => setAddDialogOpen(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Migrant
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
                        <TableHead className="text-slate-300">Photos</TableHead>
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
                      ) : migrantsData?.data.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-slate-400 py-8">
                            No migrants found
                          </TableCell>
                        </TableRow>
                      ) : (
                        migrantsData?.data.map((person: Person) => (
                          <TableRow key={person.person_id} className="border-slate-700 hover:bg-slate-700/50">
                            <TableCell className="text-white font-medium">{person.fullName}</TableCell>
                            <TableCell className="text-slate-300">{person.date_of_birth || 'N/A'}</TableCell>
                            <TableCell className="text-slate-300">
                              {formatDate(person.migration.date_of_arrival_nt)}
                            </TableCell>
                            <TableCell className="text-slate-300">{person.place_of_birth || 'N/A'}</TableCell>
                            <TableCell className="text-slate-300">{person.residence.town_or_city || 'N/A'}</TableCell>
                            <TableCell className="text-slate-300">{person.occupation || 'N/A'}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={person.has_photo ? "default" : "outline"} 
                                className={person.has_photo ? "bg-green-600" : "border-slate-500 text-slate-400"}
                              >
                                <Camera className="w-3 h-3 mr-1" />
                                {person.has_photo ? 'Yes' : 'No'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleDelete(person.person_id)}
                                  disabled={deleteMigrant.isPending}
                                  className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                                >
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

                {/* Pagination */}
                {migrantsData && migrantsData.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 p-4 border-t border-slate-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="border-slate-600 text-slate-300"
                    >
                      Previous
                    </Button>
                    <span className="text-slate-400 px-4">
                      Page {currentPage} of {migrantsData.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === migrantsData.totalPages}
                      className="border-slate-600 text-slate-300"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AddMigrantDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
      />
    </div>
  );
};

export default AdminMigrants;
