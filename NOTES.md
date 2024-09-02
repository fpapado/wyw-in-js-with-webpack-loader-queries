# wyw-in-js compatibility

- wyw-in-js attempts to read referenced files from the filesystem
- some modules are "virtual"; they do not exist on the filesystem
- other modules use query parameters (this is webpack's blessed way of configuring loaders), such as `arrow.svg?svgUse`
- when wyw-in-js attempts to read the above from the filesystem, it crashes

Funnily enough this does not happen in the vite plugin. I imagine this happens because vite plugins encode resolution semantics (the `resolveId` hook), so wyw-in-js only ever sees `arrow.svg`, after the svgUse plugin has resolved it.

In contrast, webpack loaders typically rely on queries, and webpack loaders do not add a resolver.

I would be more than happy to contribute a fix for this, if you can point me in the right direction.

The hacky solution is to fall back / deopt if reading a file fails, and just assume that the referenced component is compatible. This would be done in transform's `Entrypoint.helpers.js`

Another solution is to do _something_ in the webpack loader, to augment the resolving strategy, in order to strip query parameters. This would require exposing some resolution hook from transform. This approach will solve the query parameter issue generally, but not the virtual module issue (since virtual modules tend to be ad-hoc).

I'm leaning towards the first approach, which would be rather general. If wyw-in-js needs concrete information from the referenced file (e.g. if it is used as a selector in an interpolation), then I think those codepaths will fail fast, same as now. 

Essentially, this unlocks this case:

```ts
import {Component as Arrow} from './arrow.svg?svgUse';

const StyledArrow = styled(Arrow)`
    color: turquoise;
`
```
