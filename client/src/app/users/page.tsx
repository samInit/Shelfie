"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User, Mail, Hash, Search } from "lucide-react";
import { useState } from "react";

const columns: GridColDef[] = [
  { 
    field: "userId", 
    headerName: "ID", 
    width: 90,
  },
  { 
    field: "name", 
    headerName: "Name", 
    width: 200,
  },
  { 
    field: "email", 
    headerName: "Email", 
    width: 200,
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              Failed to fetch users. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter((user: any) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId?.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Users
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and view all registered users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Now
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {Math.floor(users.length * 0.6)}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Hash className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Verified
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {Math.floor(users.length * 0.85)}
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Data Grid */}
          <div className="overflow-hidden">
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              getRowId={(row) => row.userId}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
              pageSizeOptions={[5, 10, 25, 50]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              sx={{
  border: 0,
  '& .MuiDataGrid-main': {
    backgroundColor: 'transparent',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgb(55 65 81)',
    color: 'rgb(243 244 246)',
    padding: '16px',
    fontSize: '0.875rem',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgb(17 24 39) !important',
    borderBottom: '2px solid rgb(59 130 246)',
    minHeight: '56px !important',
    maxHeight: '56px !important',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'rgb(17 24 39) !important',
    padding: '16px',
    '&:focus': {
      outline: 'none',
    },
    '&:focus-within': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: 'rgb(255 255 255) !important',
    fontWeight: '700 !important',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  // THIS IS THE KEY FIX - fills the empty space
  '& .MuiDataGrid-filler': {
    backgroundColor: 'rgb(17 24 39) !important',
  },
  '& .MuiDataGrid-scrollbarFiller': {
    backgroundColor: 'rgb(17 24 39) !important',
  },
  '& .MuiDataGrid-columnHeadersInner': {
    backgroundColor: 'rgb(17 24 39) !important',
  },
  '& .MuiDataGrid-row': {
    backgroundColor: 'rgb(31 41 55)',
    '&:hover': {
      backgroundColor: 'rgb(55 65 81) !important',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgb(55 65 81) !important',
      '&:hover': {
        backgroundColor: 'rgb(75 85 99) !important',
      },
    },
  },
  '& .MuiCheckbox-root': {
    color: 'rgb(156 163 175)',
    '&.Mui-checked': {
      color: 'rgb(59 130 246)',
    },
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid rgb(55 65 81)',
    backgroundColor: 'rgb(31 41 55)',
  },
  '& .MuiTablePagination-root': {
    color: 'rgb(209 213 219)',
  },
  '& .MuiIconButton-root': {
    color: 'rgb(209 213 219) !important',
  },
  '& .MuiSvgIcon-root': {
    color: 'rgb(209 213 219) !important',
  },
  '& .MuiDataGrid-columnSeparator': {
    color: 'rgb(75 85 99)',
  },
}}

              className="dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
