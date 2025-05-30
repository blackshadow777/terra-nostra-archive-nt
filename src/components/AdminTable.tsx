
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Migrant {
  id: number;
  fullName: string;
  region: string;
  settlement: string;
  arrivalYear: number;
  status: string;
}

const AdminTable = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"admins" | "migrants">("admins");
  
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Editor Smith", email: "editor@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Viewer Jones", email: "viewer@example.com", role: "Viewer", status: "Inactive" }
  ]);

  const [migrants, setMigrants] = useState<Migrant[]>([
    { id: 1, fullName: "Giuseppe Rossi", region: "Veneto", settlement: "Darwin", arrivalYear: 1951, status: "Published" },
    { id: 2, fullName: "Maria Benedetti", region: "Sicily", settlement: "Katherine", arrivalYear: 1955, status: "Draft" },
    { id: 3, fullName: "Antonio Lombardi", region: "Calabria", settlement: "Tennant Creek", arrivalYear: 1950, status: "Published" }
  ]);

  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [isAddingMigrant, setIsAddingMigrant] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [editingMigrant, setEditingMigrant] = useState<Migrant | null>(null);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "Editor" });
  const [newMigrant, setNewMigrant] = useState({ fullName: "", region: "", settlement: "", arrivalYear: new Date().getFullYear() });

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      const admin: Admin = {
        id: Date.now(),
        ...newAdmin,
        status: "Active"
      };
      setAdmins([...admins, admin]);
      setNewAdmin({ name: "", email: "", role: "Editor" });
      setIsAddingAdmin(false);
      toast({
        title: "Admin Added",
        description: "New admin has been added successfully.",
      });
    }
  };

  const handleAddMigrant = () => {
    if (newMigrant.fullName && newMigrant.region) {
      const migrant: Migrant = {
        id: Date.now(),
        ...newMigrant,
        status: "Draft"
      };
      setMigrants([...migrants, migrant]);
      setNewMigrant({ fullName: "", region: "", settlement: "", arrivalYear: new Date().getFullYear() });
      setIsAddingMigrant(false);
      toast({
        title: "Migrant Record Added",
        description: "New migrant record has been created successfully.",
      });
    }
  };

  const handleUpdateAdmin = () => {
    if (editingAdmin) {
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id ? editingAdmin : admin
      ));
      setEditingAdmin(null);
      toast({
        title: "Admin Updated",
        description: "Admin information has been updated successfully.",
      });
    }
  };

  const handleUpdateMigrant = () => {
    if (editingMigrant) {
      setMigrants(migrants.map(migrant => 
        migrant.id === editingMigrant.id ? editingMigrant : migrant
      ));
      setEditingMigrant(null);
      toast({
        title: "Migrant Record Updated",
        description: "Migrant record has been updated successfully.",
      });
    }
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    toast({
      title: "Admin Deleted",
      description: "Admin has been removed successfully.",
    });
  };

  const handleDeleteMigrant = (id: number) => {
    setMigrants(migrants.filter(migrant => migrant.id !== id));
    toast({
      title: "Migrant Record Deleted",
      description: "Migrant record has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-terra-beige">
        <Button
          variant={activeTab === "admins" ? "default" : "ghost"}
          onClick={() => setActiveTab("admins")}
          className={activeTab === "admins" ? "bg-terra-red text-white" : "text-terra-navy"}
        >
          <User className="w-4 h-4 mr-2" />
          Admin Management
        </Button>
        <Button
          variant={activeTab === "migrants" ? "default" : "ghost"}
          onClick={() => setActiveTab("migrants")}
          className={activeTab === "migrants" ? "bg-terra-red text-white" : "text-terra-navy"}
        >
          <User className="w-4 h-4 mr-2" />
          Migrant Records
        </Button>
      </div>

      {activeTab === "admins" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-terra-navy">Admin Users</CardTitle>
            <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
              <DialogTrigger asChild>
                <Button className="bg-terra-green hover:bg-terra-green/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="admin-name">Name</Label>
                    <Input
                      id="admin-name"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                      placeholder="Enter admin name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                      placeholder="Enter admin email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-role">Role</Label>
                    <select
                      id="admin-role"
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                      className="w-full p-2 border border-terra-beige rounded-md"
                    >
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <Button onClick={handleAddAdmin} className="w-full bg-terra-red hover:bg-terra-red/90">
                    Add Admin
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-terra-navy text-terra-navy">
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={admin.status === "Active" ? "bg-terra-green" : "bg-terra-yellow"}>
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setEditingAdmin(admin)}
                              className="text-terra-navy hover:text-terra-green"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Admin</DialogTitle>
                            </DialogHeader>
                            {editingAdmin && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-admin-name">Name</Label>
                                  <Input
                                    id="edit-admin-name"
                                    value={editingAdmin.name}
                                    onChange={(e) => setEditingAdmin({...editingAdmin, name: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-admin-email">Email</Label>
                                  <Input
                                    id="edit-admin-email"
                                    value={editingAdmin.email}
                                    onChange={(e) => setEditingAdmin({...editingAdmin, email: e.target.value})}
                                  />
                                </div>
                                <Button onClick={handleUpdateAdmin} className="w-full bg-terra-red hover:bg-terra-red/90">
                                  Update Admin
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="text-terra-navy hover:text-terra-red"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "migrants" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-terra-navy">Migrant Records</CardTitle>
            <Dialog open={isAddingMigrant} onOpenChange={setIsAddingMigrant}>
              <DialogTrigger asChild>
                <Button className="bg-terra-green hover:bg-terra-green/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Migrant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Migrant Record</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="migrant-name">Full Name</Label>
                    <Input
                      id="migrant-name"
                      value={newMigrant.fullName}
                      onChange={(e) => setNewMigrant({...newMigrant, fullName: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="migrant-region">Italian Region</Label>
                    <Input
                      id="migrant-region"
                      value={newMigrant.region}
                      onChange={(e) => setNewMigrant({...newMigrant, region: e.target.value})}
                      placeholder="e.g., Veneto, Sicily"
                    />
                  </div>
                  <div>
                    <Label htmlFor="migrant-settlement">NT Settlement</Label>
                    <Input
                      id="migrant-settlement"
                      value={newMigrant.settlement}
                      onChange={(e) => setNewMigrant({...newMigrant, settlement: e.target.value})}
                      placeholder="e.g., Darwin, Katherine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="migrant-year">Arrival Year</Label>
                    <Input
                      id="migrant-year"
                      type="number"
                      value={newMigrant.arrivalYear}
                      onChange={(e) => setNewMigrant({...newMigrant, arrivalYear: parseInt(e.target.value)})}
                      min="1800"
                      max="2000"
                    />
                  </div>
                  <Button onClick={handleAddMigrant} className="w-full bg-terra-red hover:bg-terra-red/90">
                    Add Migrant Record
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Settlement</TableHead>
                  <TableHead>Arrival Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {migrants.map((migrant) => (
                  <TableRow key={migrant.id}>
                    <TableCell>{migrant.fullName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-terra-green text-terra-green">
                        {migrant.region}
                      </Badge>
                    </TableCell>
                    <TableCell>{migrant.settlement}</TableCell>
                    <TableCell>{migrant.arrivalYear}</TableCell>
                    <TableCell>
                      <Badge className={migrant.status === "Published" ? "bg-terra-green" : "bg-terra-yellow"}>
                        {migrant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setEditingMigrant(migrant)}
                              className="text-terra-navy hover:text-terra-green"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Migrant Record</DialogTitle>
                            </DialogHeader>
                            {editingMigrant && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-migrant-name">Full Name</Label>
                                  <Input
                                    id="edit-migrant-name"
                                    value={editingMigrant.fullName}
                                    onChange={(e) => setEditingMigrant({...editingMigrant, fullName: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-migrant-region">Region</Label>
                                  <Input
                                    id="edit-migrant-region"
                                    value={editingMigrant.region}
                                    onChange={(e) => setEditingMigrant({...editingMigrant, region: e.target.value})}
                                  />
                                </div>
                                <Button onClick={handleUpdateMigrant} className="w-full bg-terra-red hover:bg-terra-red/90">
                                  Update Record
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDeleteMigrant(migrant.id)}
                          className="text-terra-navy hover:text-terra-red"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminTable;
