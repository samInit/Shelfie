"use client";

import { useGetProductsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Search,
  Download,
  Filter
} from "lucide-react";
import { useState, useMemo } from "react";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const columns: GridColDef[] = [
    { 
      field: "productId", 
      headerName: "ID", 
      width: 90,
      headerClassName: "font-semibold",
    },
    { 
      field: "name", 
      headerName: "Product Name", 
      width: 250,
      headerClassName: "font-semibold",
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      type: "number",
      headerClassName: "font-semibold",
      valueGetter: (value, row) => `$${row.price.toFixed(2)}`,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
      type: "number",
      headerClassName: "font-semibold",
      valueGetter: (value, row) => (row.rating ? row.rating.toFixed(1) : "N/A"),
    },
    {
      field: "stockQuantity",
      headerName: "Stock Quantity",
      width: 150,
      type: "number",
      headerClassName: "font-semibold",
      renderCell: (params) => {
        const stock = params.value as number;
        const isLowStock = stock < 20;
        return (
          <div className={`flex items-center space-x-2 ${isLowStock ? 'text-red-600 dark:text-red-400 font-semibold' : ''}`}>
            {isLowStock && <AlertTriangle className="w-4 h-4" />}
            <span>{stock}</span>
          </div>
        );
      },
    },
  ];

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product: any) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productId?.toString().includes(searchTerm)
    );
  }, [products, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!products) return { total: 0, totalValue: 0, lowStock: 0, avgRating: 0 };
    
    const totalValue = products.reduce((sum: number, product: any) => 
      sum + (product.price * product.stockQuantity), 0
    );
    
    const lowStock = products.filter((product: any) => product.stockQuantity < 20).length;
    
    const avgRating = products.reduce((sum: number, product: any) => 
      sum + (product.rating || 0), 0
    ) / products.length;

    return {
      total: products.length,
      totalValue,
      lowStock,
      avgRating
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <p className="text-red-600 dark:text-red-400 font-medium">
              Failed to fetch inventory data. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Inventory
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage product inventory levels
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Products
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Inventory Value
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  ${stats.totalValue.toFixed(0)}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Low Stock Items
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.lowStock}
                </p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Avg Rating
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {stats.avgRating.toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-hidden">
            <DataGrid
              rows={filteredProducts}
              columns={columns}
              getRowId={(row) => row.productId}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
              pageSizeOptions={[10, 25, 50, 100]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
                },
              }}
              sx={{
                border: 0,
                '& .MuiDataGrid-main': {
                  backgroundColor: 'transparent',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid',
                  borderColor: 'rgb(229 231 235)',
                  color: 'rgb(17 24 39)',
                  fontSize: '0.875rem',
                  padding: '16px',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'rgb(249 250 251)',
                  borderBottom: '2px solid rgb(229 231 235)',
                  color: 'rgb(55 65 81)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'rgb(249 250 251)',
                },
                '& .MuiCheckbox-root': {
                  color: 'rgb(156 163 175)',
                },
                '& .MuiCheckbox-root.Mui-checked': {
                  color: 'rgb(59 130 246)',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid rgb(229 231 235)',
                  backgroundColor: 'rgb(249 250 251)',
                },
                // Dark mode styles
                '@media (prefers-color-scheme: dark)': {
                  '& .MuiDataGrid-cell': {
                    borderColor: 'rgb(55 65 81)',
                    color: 'rgb(243 244 246)',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'rgb(31 41 55)',
                    borderBottom: '2px solid rgb(55 65 81)',
                    color: 'rgb(209 213 219)',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgb(31 41 55)',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: '1px solid rgb(55 65 81)',
                    backgroundColor: 'rgb(31 41 55)',
                  },
                  '& .MuiTablePagination-root': {
                    color: 'rgb(209 213 219)',
                  },
                  '& .MuiIconButton-root': {
                    color: 'rgb(209 213 219)',
                  },
                  '& .MuiDataGrid-selectedRowCount': {
                    color: 'rgb(209 213 219)',
                  },
                },
              }}
              className="dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Alert Banner for Low Stock */}
        {stats.lowStock > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                  Low Stock Alert
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  {stats.lowStock} product{stats.lowStock > 1 ? 's' : ''} {stats.lowStock > 1 ? 'are' : 'is'} running low on stock (below 20 units). Consider restocking soon.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
