-- =============================================================================
-- YUPII GIFT EXPERIENCE MARKETPLACE - Complete Database Migration
-- =============================================================================
-- Project: sldvncoicbejphjqhzdo
-- Run this entire file in the Supabase SQL Editor in one go.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Utility: updated_at trigger function
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- 2. CATEGORIES
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  icon          TEXT,
  description   TEXT,
  display_order INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 3. PARTNERS (aliados)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partners (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT NOT NULL,
  slug               TEXT UNIQUE NOT NULL,
  type               TEXT NOT NULL CHECK (type IN ('restaurant','spa','hotel','adventure','nautical','cultural')),
  description        TEXT,
  logo_url           TEXT,
  contact_name       TEXT,
  contact_email      TEXT,
  contact_phone      TEXT,
  address            TEXT,
  city               TEXT,
  province           TEXT,
  website            TEXT,
  instagram          TEXT,
  schedule           JSONB,
  commission_percent DECIMAL(5,2) DEFAULT 25.00,
  notes              TEXT,
  is_active          BOOLEAN DEFAULT true,
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 4. EXPERIENCES (main product)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title                   TEXT NOT NULL,
  slug                    TEXT UNIQUE NOT NULL,
  category_id             UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  description             TEXT NOT NULL,
  short_description       TEXT,
  icon                    TEXT,
  price_current           DECIMAL(10,2) NOT NULL,
  price_original          DECIMAL(10,2),
  currency                TEXT DEFAULT 'DOP',
  capacity                TEXT,
  capacity_number         INT DEFAULT 1,
  location                TEXT,
  province                TEXT,
  duration                TEXT,
  rating                  DECIMAL(2,1) DEFAULT 0,
  rating_count            INT DEFAULT 0,
  status                  TEXT DEFAULT 'draft' CHECK (status IN ('draft','active','paused','archived')),
  badge                   TEXT,
  is_featured             BOOLEAN DEFAULT false,
  display_order           INT DEFAULT 0,
  valid_from              DATE,
  valid_until             DATE,
  redemption_instructions TEXT,
  terms_and_conditions    TEXT,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 5. EXPERIENCE_INCLUSIONS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experience_inclusions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id  UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  description    TEXT NOT NULL,
  display_order  INT DEFAULT 0
);

-- ---------------------------------------------------------------------------
-- 6. EXPERIENCE_PARTNERS (many-to-many)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experience_partners (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id  UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  partner_id     UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  schedule_note  TEXT,
  is_primary     BOOLEAN DEFAULT false,
  UNIQUE (experience_id, partner_id)
);

-- ---------------------------------------------------------------------------
-- 7. EXPERIENCE_IMAGES
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experience_images (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id  UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  image_url      TEXT NOT NULL,
  alt_text       TEXT,
  display_order  INT DEFAULT 0,
  is_cover       BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 8. CORPORATE_CLIENTS (created before orders so FK works)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.corporate_clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name    TEXT NOT NULL,
  rnc             TEXT,
  contact_name    TEXT NOT NULL,
  contact_email   TEXT NOT NULL,
  contact_phone   TEXT,
  address         TEXT,
  city            TEXT,
  industry        TEXT,
  employee_count  INT,
  notes           TEXT,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER corporate_clients_updated_at
  BEFORE UPDATE ON public.corporate_clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 9. ORDERS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        TEXT UNIQUE NOT NULL,
  type                TEXT DEFAULT 'individual' CHECK (type IN ('individual','corporate')),
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','delivered','cancelled','refunded')),
  buyer_name          TEXT NOT NULL,
  buyer_email         TEXT NOT NULL,
  buyer_phone         TEXT,
  recipient_name      TEXT,
  recipient_email     TEXT,
  recipient_phone     TEXT,
  gift_message        TEXT,
  delivery_date       DATE,
  delivery_method     TEXT DEFAULT 'email' CHECK (delivery_method IN ('email','whatsapp','print')),
  subtotal            DECIMAL(10,2) NOT NULL,
  discount_amount     DECIMAL(10,2) DEFAULT 0,
  tax_amount          DECIMAL(10,2) DEFAULT 0,
  total               DECIMAL(10,2) NOT NULL,
  currency            TEXT DEFAULT 'DOP',
  payment_method      TEXT,
  payment_reference   TEXT,
  payment_provider    TEXT,
  paid_at             TIMESTAMPTZ,
  corporate_client_id UUID REFERENCES public.corporate_clients(id) ON DELETE SET NULL,
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 10. ORDER_ITEMS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id       UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  experience_id  UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
  quantity       INT DEFAULT 1,
  unit_price     DECIMAL(10,2) NOT NULL,
  total_price    DECIMAL(10,2) NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 11. GIFT_CODES
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gift_codes (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code                    TEXT UNIQUE NOT NULL,
  order_item_id           UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  experience_id           UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
  status                  TEXT DEFAULT 'active' CHECK (status IN ('active','reserved','redeemed','expired','cancelled')),
  issued_at               TIMESTAMPTZ DEFAULT now(),
  expires_at              TIMESTAMPTZ NOT NULL,
  reserved_at             TIMESTAMPTZ,
  redeemed_at             TIMESTAMPTZ,
  redeemed_by_name        TEXT,
  redeemed_by_email       TEXT,
  redeemed_by_phone       TEXT,
  redeemed_at_partner_id  UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  redemption_date         DATE,
  redemption_notes        TEXT,
  corporate_client_id     UUID REFERENCES public.corporate_clients(id) ON DELETE SET NULL,
  employee_name           TEXT,
  employee_email          TEXT,
  amount                  DECIMAL(10,2),
  currency                TEXT DEFAULT 'DOP',
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER gift_codes_updated_at
  BEFORE UPDATE ON public.gift_codes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 12. CORPORATE_PROPOSALS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.corporate_proposals (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  corporate_client_id UUID REFERENCES public.corporate_clients(id) ON DELETE SET NULL,
  proposal_number     TEXT UNIQUE NOT NULL,
  title               TEXT NOT NULL,
  type                TEXT CHECK (type IN ('year_end','recognition','raffle','incentive')),
  status              TEXT DEFAULT 'draft' CHECK (status IN ('draft','sent','negotiating','accepted','rejected','completed')),
  budget_per_person   DECIMAL(10,2),
  employee_count      INT,
  total_budget        DECIMAL(10,2),
  description         TEXT,
  valid_until         DATE,
  order_id            UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER corporate_proposals_updated_at
  BEFORE UPDATE ON public.corporate_proposals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ---------------------------------------------------------------------------
-- 13. BUSINESS_SETTINGS (single-row config)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_settings (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name               TEXT DEFAULT 'Yupii',
  tagline                     TEXT,
  contact_email               TEXT,
  contact_phone               TEXT,
  whatsapp                    TEXT,
  instagram                   TEXT,
  address                     TEXT,
  tax_rate                    DECIMAL(5,2) DEFAULT 18.00,
  default_code_validity_days  INT DEFAULT 365,
  gift_code_prefix            TEXT DEFAULT 'YUPII',
  notification_email          TEXT,
  logo_url                    TEXT,
  currency                    TEXT DEFAULT 'DOP',
  updated_at                  TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER business_settings_updated_at
  BEFORE UPDATE ON public.business_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON public.categories(display_order);

-- Partners
CREATE INDEX IF NOT EXISTS idx_partners_slug ON public.partners(slug);
CREATE INDEX IF NOT EXISTS idx_partners_type ON public.partners(type);
CREATE INDEX IF NOT EXISTS idx_partners_is_active ON public.partners(is_active);
CREATE INDEX IF NOT EXISTS idx_partners_city ON public.partners(city);
CREATE INDEX IF NOT EXISTS idx_partners_province ON public.partners(province);

-- Experiences
CREATE INDEX IF NOT EXISTS idx_experiences_slug ON public.experiences(slug);
CREATE INDEX IF NOT EXISTS idx_experiences_category_id ON public.experiences(category_id);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON public.experiences(status);
CREATE INDEX IF NOT EXISTS idx_experiences_is_featured ON public.experiences(is_featured);
CREATE INDEX IF NOT EXISTS idx_experiences_province ON public.experiences(province);
CREATE INDEX IF NOT EXISTS idx_experiences_display_order ON public.experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_experiences_price_current ON public.experiences(price_current);
CREATE INDEX IF NOT EXISTS idx_experiences_status_featured ON public.experiences(status, is_featured);

-- Experience inclusions
CREATE INDEX IF NOT EXISTS idx_experience_inclusions_experience_id ON public.experience_inclusions(experience_id);

-- Experience partners
CREATE INDEX IF NOT EXISTS idx_experience_partners_experience_id ON public.experience_partners(experience_id);
CREATE INDEX IF NOT EXISTS idx_experience_partners_partner_id ON public.experience_partners(partner_id);

-- Experience images
CREATE INDEX IF NOT EXISTS idx_experience_images_experience_id ON public.experience_images(experience_id);
CREATE INDEX IF NOT EXISTS idx_experience_images_is_cover ON public.experience_images(experience_id, is_cover);

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON public.orders(buyer_email);
CREATE INDEX IF NOT EXISTS idx_orders_corporate_client_id ON public.orders(corporate_client_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_type ON public.orders(type);

-- Order items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_experience_id ON public.order_items(experience_id);

-- Gift codes
CREATE INDEX IF NOT EXISTS idx_gift_codes_code ON public.gift_codes(code);
CREATE INDEX IF NOT EXISTS idx_gift_codes_status ON public.gift_codes(status);
CREATE INDEX IF NOT EXISTS idx_gift_codes_order_item_id ON public.gift_codes(order_item_id);
CREATE INDEX IF NOT EXISTS idx_gift_codes_experience_id ON public.gift_codes(experience_id);
CREATE INDEX IF NOT EXISTS idx_gift_codes_expires_at ON public.gift_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_gift_codes_corporate_client_id ON public.gift_codes(corporate_client_id);
CREATE INDEX IF NOT EXISTS idx_gift_codes_redeemed_at_partner ON public.gift_codes(redeemed_at_partner_id);

-- Corporate clients
CREATE INDEX IF NOT EXISTS idx_corporate_clients_company_name ON public.corporate_clients(company_name);
CREATE INDEX IF NOT EXISTS idx_corporate_clients_is_active ON public.corporate_clients(is_active);

-- Corporate proposals
CREATE INDEX IF NOT EXISTS idx_corporate_proposals_client_id ON public.corporate_proposals(corporate_client_id);
CREATE INDEX IF NOT EXISTS idx_corporate_proposals_status ON public.corporate_proposals(status);
CREATE INDEX IF NOT EXISTS idx_corporate_proposals_order_id ON public.corporate_proposals(order_id);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_images   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_codes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_clients   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings   ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------------------
-- Admin policies: authenticated users get full CRUD on everything
-- -------------------------------------------------------------------------

-- Categories
CREATE POLICY "Admin full access on categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Partners
CREATE POLICY "Admin full access on partners"
  ON public.partners FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Experiences
CREATE POLICY "Admin full access on experiences"
  ON public.experiences FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Experience inclusions
CREATE POLICY "Admin full access on experience_inclusions"
  ON public.experience_inclusions FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Experience partners
CREATE POLICY "Admin full access on experience_partners"
  ON public.experience_partners FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Experience images
CREATE POLICY "Admin full access on experience_images"
  ON public.experience_images FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Orders
CREATE POLICY "Admin full access on orders"
  ON public.orders FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Order items
CREATE POLICY "Admin full access on order_items"
  ON public.order_items FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Gift codes
CREATE POLICY "Admin full access on gift_codes"
  ON public.gift_codes FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Corporate clients
CREATE POLICY "Admin full access on corporate_clients"
  ON public.corporate_clients FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Corporate proposals
CREATE POLICY "Admin full access on corporate_proposals"
  ON public.corporate_proposals FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Business settings
CREATE POLICY "Admin full access on business_settings"
  ON public.business_settings FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- -------------------------------------------------------------------------
-- Public read policies (anon can browse active experiences & categories)
-- -------------------------------------------------------------------------

-- Public: read active categories
CREATE POLICY "Public read active categories"
  ON public.categories FOR SELECT
  TO anon
  USING (is_active = true);

-- Public: read active experiences
CREATE POLICY "Public read active experiences"
  ON public.experiences FOR SELECT
  TO anon
  USING (status = 'active');

-- Public: read inclusions for active experiences
CREATE POLICY "Public read experience inclusions"
  ON public.experience_inclusions FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.experiences e
      WHERE e.id = experience_id AND e.status = 'active'
    )
  );

-- Public: read images for active experiences
CREATE POLICY "Public read experience images"
  ON public.experience_images FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.experiences e
      WHERE e.id = experience_id AND e.status = 'active'
    )
  );

-- Public: read partner associations for active experiences
CREATE POLICY "Public read experience partners"
  ON public.experience_partners FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.experiences e
      WHERE e.id = experience_id AND e.status = 'active'
    )
  );

-- Public: read active partners (needed so joins work)
CREATE POLICY "Public read active partners"
  ON public.partners FOR SELECT
  TO anon
  USING (is_active = true);

-- Public: read business settings (storefront config)
CREATE POLICY "Public read business settings"
  ON public.business_settings FOR SELECT
  TO anon
  USING (true);

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Default categories
INSERT INTO public.categories (name, slug, icon, description, display_order) VALUES
  ('Gastronomia',   'gastronomia',   '🍽️', 'Experiencias culinarias y gastronómicas',                     1),
  ('Bienestar',     'bienestar',     '🧖', 'Spa, masajes y experiencias de relajación',                   2),
  ('Aventura',      'aventura',      '🏔️', 'Deportes extremos y actividades al aire libre',               3),
  ('Nautica',       'nautica',       '⛵', 'Paseos en bote, catamarán y experiencias acuáticas',          4),
  ('Cultural',      'cultural',      '🎭', 'Tours culturales, museos y experiencias artísticas',          5),
  ('Hospedaje',     'hospedaje',     '🏨', 'Estadías en hoteles, villas y alojamientos exclusivos',       6)
ON CONFLICT (slug) DO NOTHING;

-- Default business settings (single row)
INSERT INTO public.business_settings (
  business_name,
  tagline,
  tax_rate,
  default_code_validity_days,
  gift_code_prefix,
  currency
) VALUES (
  'Yupii',
  'Regala experiencias, no cosas',
  18.00,
  365,
  'YUPII',
  'DOP'
);

-- =============================================================================
-- DONE
-- =============================================================================
