# esar

A tiny library for bundling multiple files into a single binary blob.

```js
import { Archive, bundle } from "esar";
// or import from esm.sh in browser
// import { Archive, bundle } from "https://esm.sh/esar";

// bundle some files
const data = bundle([
  new File(["bar"], "foo.txt", { type: "text/plain" }),
  new File(["foo"], "bar.txt", { type: "text/plain" }),
]);

// read the archive
const archive = new Archive(data);
archive.checksum; // a 32-bit checksum of the archive
archive.entries.length; // => 2
archive.entries[0].name; // => "foo.txt"
archive.entries[0].type; // => "text/plain"
archive.entries[1].name; // => "bar.txt"
archive.entries[1].type; // => "text/plain"
archive.openFile("foo.txt"); // => File(["bar"], "foo.txt", { type: "text/plain" })
archive.openFile("bar.txt"); // => File(["foo"], "bar.txt", { type: "text/plain" })
```

## Compression

This library does not compress the archived files. Below is an example of how to use `CompressionStream` to compress data
with `gzip` algorithm, and use `DecompressionStream` to decompress the data again.

```js
import { Archive, bundle } from "esar";

const data = bundle([/* add some files */]);

// compress and decompress the data
const compressed = await readAll(new Blob([data]).stream().pipeThrough(new CompressionStream("gzip")));
const decompressed = await readAll(new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip")));
```

> Note that `CompressionStream` and `DecompressionStream` are not supported in all browsers, and you may need to use a
> polyfill or a different compression algorithm depending on your requirements.
