export function realloc(buffer: ArrayBuffer, size: number): ArrayBuffer {
  if (buffer.maxByteLength < size) {
    const __size = 1 << Math.ceil(Math.log2(size));
    const newBuf = new ArrayBuffer(size, {maxByteLength: __size});

    let srcView = new Uint8Array(buffer);
    let dstView = new Uint8Array(newBuf);

    dstView.set(srcView);
    return newBuf;
  }
  if (buffer.byteLength < size) {
    buffer.resize(size);
  }
  return buffer;
}

export function concat(buf1: ArrayBuffer, buf2: ArrayBuffer): ArrayBuffer {
  const sizeNeeded = buf1.byteLength + buf2.byteLength;
  let __bufBase = buf1;

  if (buf1.maxByteLength < sizeNeeded) {
    newBuf = realloc(buf1, sizeNeeded);
    newBuf.set(buf2, buf1.byteLength);
    __bufBase = newBuf;
  }

  let bufBaseView = new Uint8Array(__bufBase);
  let buf2View = new Uint8Array(buf2);

  bufBaseView.set(buf2View, buf1.byteLength);
  return newBuf
}

export function copy(buf: ArrayBuffer): ArrayBuffer {
  let __newBuf = new ArrayBuffer(buf.byteLength, {maxByteLength: buf.maxByteLength});

  let srcView = new Uint8Array(buf);
  let dstView = new Uint8Array(__newBuf);

  dstView.set(srcView, buf.byteLength);
  return __newBuf;
}
