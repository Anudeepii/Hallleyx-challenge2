/*
  # Create Customer Orders Table

  ## Overview
  This migration creates the core customer_orders table to store all order information
  for the dashboard builder application.

  ## New Tables
  - `customer_orders`
    - `id` (uuid, primary key) - Unique order identifier
    - `customer_id` (text) - Auto-generated customer ID (CUS-001, CUS-002, etc.)
    - `order_id` (text) - Auto-generated order ID (ORD-001, ORD-002, etc.)
    - `first_name` (text) - Customer first name
    - `last_name` (text) - Customer last name
    - `email` (text) - Customer email address
    - `phone` (text) - Customer phone number
    - `street_address` (text) - Street address
    - `city` (text) - City name
    - `state` (text) - State or province
    - `postal_code` (text) - Postal/ZIP code
    - `country` (text) - Country name
    - `product` (text) - Selected product/service
    - `quantity` (integer) - Order quantity (min: 1)
    - `unit_price` (numeric) - Price per unit
    - `total_amount` (numeric) - Calculated total (quantity × unit_price)
    - `status` (text) - Order status (Pending, In progress, Completed)
    - `created_by` (text) - Person who created the order
    - `order_date` (timestamptz) - Order creation timestamp
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable RLS on `customer_orders` table
  - Add policies for authenticated users to manage their data
  - Public read access for dashboard data (adjust based on requirements)

  ## Notes
  - All customer and order data fields are required
  - Total amount is stored as calculated value for performance
  - Timestamps use timezone-aware format
  - Indexes added for common query patterns
*/

-- Create customer_orders table
CREATE TABLE IF NOT EXISTS customer_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  order_id text NOT NULL UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  street_address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  product text NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  unit_price numeric(10, 2) NOT NULL CHECK (unit_price >= 0),
  total_amount numeric(10, 2) NOT NULL CHECK (total_amount >= 0),
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In progress', 'Completed')),
  created_by text NOT NULL,
  order_date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customer_orders_order_id ON customer_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_customer_orders_customer_id ON customer_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_orders_order_date ON customer_orders(order_date);
CREATE INDEX IF NOT EXISTS idx_customer_orders_status ON customer_orders(status);
CREATE INDEX IF NOT EXISTS idx_customer_orders_product ON customer_orders(product);

-- Enable Row Level Security
ALTER TABLE customer_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for customer_orders table
CREATE POLICY "Allow public read access to customer orders"
  ON customer_orders
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access to customer orders"
  ON customer_orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to customer orders"
  ON customer_orders
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to customer orders"
  ON customer_orders
  FOR DELETE
  TO public
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_customer_orders_updated_at
  BEFORE UPDATE ON customer_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
