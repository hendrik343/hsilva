-- ============================================================
-- Fix: infinite recursion in RLS policies
-- Root cause: profiles SELECT policy called my_org_id() which
-- queries profiles → triggers the policy again → infinite loop.
-- Fix: SECURITY DEFINER function get_my_org_id() runs as DB
-- owner, bypasses RLS entirely when looking up org → no recursion.
-- ============================================================

-- 1. Create safe helper function (bypasses RLS via SECURITY DEFINER)
CREATE OR REPLACE FUNCTION get_my_org_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT org_id FROM profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- 2. Drop ALL existing policies (clean slate)
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END;
$$;

-- ============================================================
-- 3. PROFILES — use auth.uid() directly, never get_my_org_id()
-- ============================================================
CREATE POLICY profiles_select ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY profiles_insert ON profiles
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY profiles_update ON profiles
  FOR UPDATE USING (id = auth.uid());

-- ============================================================
-- 4. ORGANISATIONS
-- ============================================================
CREATE POLICY org_select ON organisations
  FOR SELECT USING (id = get_my_org_id());

CREATE POLICY org_insert ON organisations
  FOR INSERT WITH CHECK (true);  -- needed during registration before profile exists

CREATE POLICY org_update ON organisations
  FOR UPDATE USING (id = get_my_org_id());

-- ============================================================
-- 5. PROJECTS — scoped to org
-- ============================================================
CREATE POLICY projects_all ON projects
  FOR ALL
  USING (org_id = get_my_org_id())
  WITH CHECK (org_id = get_my_org_id());

-- ============================================================
-- 6. PROJECT-SCOPED TABLES — scoped via project → org
--    These tables use project_id (not org_id directly),
--    so we join through projects.
-- ============================================================

CREATE POLICY ps_checklists_all ON ps_checklists
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY esap_actions_all ON esap_actions
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY risk_register_all ON risk_register
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY stakeholders_all ON stakeholders
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY grievances_all ON grievances
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY contractors_all ON contractors
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY evidence_items_all ON evidence_items
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY community_reports_all ON community_reports
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY legal_register_all ON legal_register
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY physical_risk_hotspots_all ON physical_risk_hotspots
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY process_risk_map_all ON process_risk_map
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY source_watchers_all ON source_watchers
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY kpi_protocols_all ON kpi_protocols
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY ifc_reports_all ON ifc_reports
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY lender_package_all ON lender_package
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY self_assessment_all ON self_assessment
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY assessment_meta_all ON assessment_meta
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

CREATE POLICY ai_conversations_all ON ai_conversations
  FOR ALL
  USING (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()))
  WITH CHECK (project_id IN (SELECT id FROM projects WHERE org_id = get_my_org_id()));

-- ============================================================
-- 7. ORG-SCOPED TABLES
-- ============================================================
CREATE POLICY audit_logs_all ON audit_logs
  FOR ALL
  USING (org_id = get_my_org_id())
  WITH CHECK (org_id = get_my_org_id());

CREATE POLICY notifications_all ON notifications
  FOR ALL
  USING (org_id = get_my_org_id() AND user_id = auth.uid())
  WITH CHECK (org_id = get_my_org_id() AND user_id = auth.uid());

CREATE POLICY subscriptions_all ON subscriptions
  FOR ALL
  USING (org_id = get_my_org_id())
  WITH CHECK (org_id = get_my_org_id());
