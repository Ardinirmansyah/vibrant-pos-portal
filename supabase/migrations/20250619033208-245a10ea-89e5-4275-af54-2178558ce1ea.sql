
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  sku TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cash',
  status TEXT NOT NULL DEFAULT 'completed',
  customer_name TEXT,
  customer_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transaction_items table (for transaction line items)
CREATE TABLE public.transaction_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for products (all authenticated users can read, only admins can modify)
CREATE POLICY "All authenticated users can view products" 
  ON public.products 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Only admins can insert products" 
  ON public.products 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update products" 
  ON public.products 
  FOR UPDATE 
  TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete products" 
  ON public.products 
  FOR DELETE 
  TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for transactions (users can see their own, admins can see all)
CREATE POLICY "Users can view their own transactions" 
  ON public.transactions 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can create transactions" 
  ON public.transactions 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only admins can update transactions" 
  ON public.transactions 
  FOR UPDATE 
  TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for transaction_items (inherit from transactions)
CREATE POLICY "Users can view transaction items for their transactions" 
  ON public.transaction_items 
  FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.transactions 
      WHERE transactions.id = transaction_items.transaction_id 
      AND (transactions.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Users can create transaction items for their transactions" 
  ON public.transaction_items 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.transactions 
      WHERE transactions.id = transaction_items.transaction_id 
      AND transactions.user_id = auth.uid()
    )
  );

-- Insert some sample products
INSERT INTO public.products (name, description, price, stock_quantity, category, sku) VALUES
('Coffee - Espresso', 'Premium espresso blend', 3.50, 100, 'Beverages', 'BEV-001'),
('Coffee - Latte', 'Creamy latte with steamed milk', 4.75, 80, 'Beverages', 'BEV-002'),
('Croissant', 'Buttery French croissant', 2.25, 50, 'Pastries', 'PAS-001'),
('Sandwich - Club', 'Classic club sandwich', 8.99, 30, 'Food', 'FOO-001'),
('Muffin - Blueberry', 'Fresh blueberry muffin', 3.25, 40, 'Pastries', 'PAS-002');
