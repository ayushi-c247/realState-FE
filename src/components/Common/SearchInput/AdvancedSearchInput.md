AdvancedSearchInput – quick use

A controlled search input with optional debounce/throttle and flexible trigger.

Import

```tsx
import { AdvancedSearchInput } from "@/components/Common/SearchInput/AdvancedSearchInput";
```

Live search (debounced)

```tsx
const [text, setText] = useState("");
const [query, setQuery] = useState("");

<AdvancedSearchInput
  value={text}
  onChange={(e) => setText(e.currentTarget.value)}
  onClear={() => setText("")}
  onSearch={(v) => setQuery(v)}
  debounceMs={300}
  triggerOn="change"
/>
```

Enter-to-search

```tsx
const [text, setText] = useState("");
const [query, setQuery] = useState("");

<AdvancedSearchInput
  value={text}
  onChange={() => {}}     
  onClear={() => setText("")}
  onSearch={(v) => setQuery(v)}
  triggerOn="enter"
/>
```

Throttled search

```tsx
<AdvancedSearchInput
  value={text}
  onChange={() => {}}     
  onClear={() => setText("")}
  onSearch={(v) => setQuery(v)}
  throttleMs={300}
  triggerOn="change"
/>
```

Notes
- Keep using it as a controlled input (value, onChange, onClear).
- onSearch fires based on debounceMs/throttleMs and triggerOn.
- If both debounce and throttle are set, debounce wins.
- Common style props (e.g., radius, size, styles) are forwarded to Mantine Input.

