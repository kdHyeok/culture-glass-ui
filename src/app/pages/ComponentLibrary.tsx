import React, { useMemo, useState } from 'react';
import { Boxes, FileCode2, Layers3, Search } from 'lucide-react';
import { catalogSummary, ComponentStatusBadge, componentInventory } from '../componentRegistry';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

const categories = ['all', ...Array.from(new Set(componentInventory.map((item) => item.category))).sort()];

export function ComponentLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredComponents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return componentInventory.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.path.toLowerCase().includes(normalizedQuery) ||
        item.group.toLowerCase().includes(normalizedQuery) ||
        item.notes.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
              <Boxes className="h-4 w-4" />
              Component registry
            </div>
            <h1 className="text-3xl font-semibold tracking-normal text-foreground">Component Library</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              One registry file manages local component inventory, preview status, source paths, and reusable UI groups.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[520px]">
            <SummaryTile label="Total" value={catalogSummary.total} />
            <SummaryTile label="Ready" value={catalogSummary.ready} />
            <SummaryTile label="Needs preview" value={catalogSummary.needsPreview} />
            <SummaryTile label="Groups" value={catalogSummary.groups.length} />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Search className="h-4 w-4" />
                  Find
                </CardTitle>
                <CardDescription>Search by name, path, note, or group.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers3 className="h-4 w-4" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-md border px-3 py-1.5 text-sm capitalize transition-colors ${
                        category === item
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-foreground hover:bg-muted'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileCode2 className="h-4 w-4" />
                  Source of truth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Update <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/app/componentRegistry.tsx</code> when components are added,
                  removed, renamed, regrouped, or given local previews.
                </p>
              </CardContent>
            </Card>
          </aside>

          <div className="grid gap-4 xl:grid-cols-2">
            {filteredComponents.map((item) => (
              <Card key={`${item.path}-${item.name}`} className="overflow-hidden">
                <CardHeader className="gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="mt-1">{item.path}</CardDescription>
                    </div>
                    <ComponentStatusBadge status={item.status} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {item.category}
                    </Badge>
                    <Badge variant="outline">{item.group}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-muted-foreground">{item.notes}</p>
                  <div className="min-h-24 rounded-md border border-dashed border-border bg-muted/20 p-4">
                    {item.preview ? (
                      item.preview()
                    ) : (
                      <div className="flex h-16 items-center text-sm text-muted-foreground">
                        Add a preview in the registry when this component is ready for visual review.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
