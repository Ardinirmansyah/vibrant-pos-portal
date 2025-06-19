
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function Reports() {
  const { data: transactionStats } = useQuery({
    queryKey: ['transaction-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*');
      
      if (error) throw error;
      
      const today = new Date().toISOString().split('T')[0];
      const thisMonth = new Date().toISOString().slice(0, 7);
      
      const todayTransactions = data.filter(t => t.created_at.startsWith(today));
      const monthTransactions = data.filter(t => t.created_at.startsWith(thisMonth));
      
      return {
        totalRevenue: data.reduce((sum, t) => sum + Number(t.total_amount), 0),
        totalTransactions: data.length,
        todayRevenue: todayTransactions.reduce((sum, t) => sum + Number(t.total_amount), 0),
        todayTransactions: todayTransactions.length,
        monthRevenue: monthTransactions.reduce((sum, t) => sum + Number(t.total_amount), 0),
        monthTransactions: monthTransactions.length,
      };
    },
  });

  const { data: recentTransactions } = useQuery({
    queryKey: ['all-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          profiles!inner(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transaction_items')
        .select(`
          quantity,
          total_price,
          products!inner(name)
        `);
      
      if (error) throw error;
      
      const productStats = data.reduce((acc: any, item) => {
        const productName = item.products.name;
        if (!acc[productName]) {
          acc[productName] = { name: productName, quantity: 0, revenue: 0 };
        }
        acc[productName].quantity += item.quantity;
        acc[productName].revenue += Number(item.total_price);
        return acc;
      }, {});
      
      return Object.values(productStats)
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);
    },
  });

  const { data: dailyRevenue } = useQuery({
    queryKey: ['daily-revenue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('created_at, total_amount')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      
      if (error) throw error;
      
      const dailyData: any = {};
      data.forEach(transaction => {
        const date = transaction.created_at.split('T')[0];
        if (!dailyData[date]) {
          dailyData[date] = 0;
        }
        dailyData[date] += Number(transaction.total_amount);
      });
      
      return Object.entries(dailyData).map(([date, revenue]) => ({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        revenue,
      }));
    },
  });

  const paymentMethodColors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">Business performance overview</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${transactionStats?.totalRevenue.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    From {transactionStats?.totalTransactions || 0} transactions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${transactionStats?.todayRevenue.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {transactionStats?.todayTransactions || 0} transactions today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${transactionStats?.monthRevenue.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {transactionStats?.monthTransactions || 0} transactions this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${transactionStats?.totalTransactions 
                      ? (transactionStats.totalRevenue / transactionStats.totalTransactions).toFixed(2)
                      : '0.00'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average per transaction
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Revenue (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products by Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts?.map((product: any, index) => (
                      <div key={product.name} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.quantity} sold</p>
                        </div>
                        <p className="font-bold">${product.revenue.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest 10 transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Cashier</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions?.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>{transaction.profiles?.full_name || 'Unknown'}</TableCell>
                        <TableCell>{transaction.customer_name || 'Walk-in'}</TableCell>
                        <TableCell>${Number(transaction.total_amount).toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{transaction.payment_method}</TableCell>
                        <TableCell>
                          <Badge variant="default">{transaction.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
