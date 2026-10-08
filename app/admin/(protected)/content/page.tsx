import { updateSiteContentAction } from '@/app/admin/actions'
import { DEFAULT_SITE_CONTENT, getSiteContentMap } from '@/lib/siteContent'
import { FileText, Save, CheckCircle, Megaphone, Home, Info, Award, Briefcase, Phone, Shield } from 'lucide-react'

const CATEGORY_TABS = [
  { id: 'header', label: 'Announcement Bar', icon: Megaphone },
  { id: 'home', label: 'Home Page', icon: Home },
  { id: 'about', label: 'About Us', icon: Info },
  { id: 'quality', label: 'Quality & Lab', icon: Award },
  { id: 'careers', label: 'Careers Page', icon: Briefcase },
  { id: 'contact', label: 'Contact & Footer', icon: Phone },
  { id: 'policies', label: 'Policies', icon: Shield },
]

export default async function AdminPageContentManager({
  searchParams,
}: {
  searchParams: { saved?: string; tab?: string }
}) {
  const contentMap = await getSiteContentMap()
  const activeTab = searchParams?.tab || 'header'

  const filteredItems = DEFAULT_SITE_CONTENT.filter((item) => item.category === activeTab)
  const sections = Array.from(new Set(filteredItems.map((i) => i.section || 'General Content')))

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-maroon sm:text-3xl flex items-center gap-2.5">
            <FileText className="text-gold" size={28} />
            Page Content Manager
          </h1>
          <p className="text-xs text-muted">
            Display, edit, and manage text content across all site pages dynamically.
          </p>
        </div>
      </div>

      {searchParams?.saved === 'true' && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-2xs">
          <CheckCircle size={18} className="text-emerald-600 shrink-0" />
          <span>✅ Page content updated and saved successfully! Live website refreshed.</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border-gold/40 pb-2">
        {CATEGORY_TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <a
              key={tab.id}
              href={`/admin/content?tab=${tab.id}`}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-maroon text-white border-maroon shadow-xs'
                  : 'bg-white text-ink border-border-gold/60 hover:bg-cream hover:text-maroon'
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </a>
          )
        })}
      </div>

      {/* Content Form */}
      <form action={updateSiteContentAction} className="space-y-6">
        <input type="hidden" name="active_tab" value={activeTab} />

        <div className="rounded-2xl border border-border-gold/60 bg-white p-6 shadow-xs space-y-8">
          <div className="border-b border-border-gold/40 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-heading text-lg font-bold text-maroon capitalize">
                {CATEGORY_TABS.find((t) => t.id === activeTab)?.label} Section Details
              </h2>
              <p className="text-xs text-muted">Update any of the fields below and click &quot;Save Page Content&quot;.</p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark shadow-md shrink-0"
            >
              <Save size={15} />
              Save Changes
            </button>
          </div>

          <div className="space-y-8">
            {sections.map((secName) => {
              const itemsInSection = filteredItems.filter((i) => (i.section || 'General Content') === secName)
              return (
                <div key={secName} className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b border-border-gold/40 pb-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                    <h3 className="font-heading text-base font-bold text-maroon">{secName}</h3>
                    <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-bold text-maroon border border-border-gold/40">
                      {itemsInSection.length} fields
                    </span>
                  </div>

                  <div className="space-y-4">
                    {itemsInSection.map((item) => {
                      const val = contentMap[item.key] ?? item.value
                      return (
                        <div key={item.key} className="space-y-1.5 rounded-xl border border-border-gold/40 bg-cream/20 p-4">
                          <label className="block font-body text-xs font-bold uppercase tracking-wide text-maroon">
                            {item.label}
                          </label>
                          <span className="block font-mono text-[10px] text-muted">Key: {item.key}</span>

                          {item.type === 'textarea' ? (
                            <textarea
                              name={item.key}
                              defaultValue={val}
                              rows={3}
                              className="w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold"
                            />
                          ) : (
                            <input
                              type="text"
                              name={item.key}
                              defaultValue={val}
                              className="w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-4 border-t border-border-gold/40 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark shadow-md"
            >
              <Save size={16} />
              Save Page Content
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
