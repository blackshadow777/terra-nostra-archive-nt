
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterOptions, SortOption } from "@/types/admin";
import { Filter, SortAsc, SortDesc, RotateCcw } from "lucide-react";

interface MigrantFiltersProps {
  filters: Partial<FilterOptions>;
  sort: SortOption;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

const sortFields: { value: string; label: string }[] = [
  { value: 'full_name', label: 'Full Name' },
  { value: 'christian_name', label: 'First Name' },
  { value: 'surname', label: 'Last Name' },
  { value: 'date_of_birth', label: 'Birth Date' },
  { value: 'place_of_birth', label: 'Place of Birth' },
  { value: 'occupation', label: 'Occupation' },
  { value: 'date_of_arrival_nt', label: 'Arrival Date' },
  { value: 'created_at', label: 'Created Date' },
];

export default function MigrantFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onReset,
}: MigrantFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    const dateRange = filters.date_range || { start: '', end: '' };
    const newDateRange = { ...dateRange, [type]: value };
    onFiltersChange({
      ...filters,
      date_range: newDateRange,
      arrival_from: newDateRange.start,
      arrival_to: newDateRange.end
    });
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters & Sorting
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-slate-600 text-slate-300"
            >
              {isExpanded ? 'Hide' : 'Show'} Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="border-slate-600 text-slate-300"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-slate-300">Full Name</Label>
            <Input
              value={filters.full_name || filters.fullName || ''}
              onChange={(e) => {
                handleFilterChange('full_name', e.target.value);
                handleFilterChange('fullName', e.target.value);
              }}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Search by full name..."
            />
          </div>
          
          {/* Sorting */}
          <div>
            <Label className="text-slate-300">Sort by</Label>
            <Select
              value={sort.field}
              onValueChange={(value) => onSortChange({ ...sort, field: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {sortFields.map((field) => (
                  <SelectItem key={field.value} value={field.value} className="text-white">
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-slate-300">Sort Direction</Label>
            <Select
              value={sort.direction}
              onValueChange={(value) => onSortChange({ ...sort, direction: value as 'asc' | 'desc' })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="asc" className="text-white">
                  <div className="flex items-center gap-2">
                    <SortAsc className="w-4 h-4" />
                    A-Z (Ascending)
                  </div>
                </SelectItem>
                <SelectItem value="desc" className="text-white">
                  <div className="flex items-center gap-2">
                    <SortDesc className="w-4 h-4" />
                    Z-A (Descending)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-slate-600">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-300">First Name</Label>
                <Input
                  value={filters.christian_name || ''}
                  onChange={(e) => handleFilterChange('christian_name', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-slate-300">Last Name</Label>
                <Input
                  value={filters.surname || ''}
                  onChange={(e) => handleFilterChange('surname', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Birth Date</Label>
                <Input
                  type="date"
                  value={filters.date_of_birth || ''}
                  onChange={(e) => handleFilterChange('date_of_birth', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Place of Birth</Label>
                <Input
                  value={filters.place_of_birth || ''}
                  onChange={(e) => handleFilterChange('place_of_birth', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Town/City</Label>
                <Input
                  value={filters.town_or_city || ''}
                  onChange={(e) => handleFilterChange('town_or_city', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Occupation</Label>
                <Input
                  value={filters.occupation || ''}
                  onChange={(e) => handleFilterChange('occupation', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Arrival Date - From</Label>
                <Input
                  type="date"
                  value={filters.date_range?.start || filters.arrival_from || ''}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-slate-300">Arrival Date - To</Label>
                <Input
                  type="date"
                  value={filters.date_range?.end || filters.arrival_to || ''}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
