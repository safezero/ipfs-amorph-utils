const UnixFs = require('ipfs-unixfs')
const DAGNode = require('ipfs-merkle-dag').DAGNode
const Amorph = require('amorph')
const amorphBufferPlugin = require('amorph-buffer')
const amorphBase58Plugin = require('amorph-base58')
const arguguard = require('arguguard')

Amorph.loadPlugin(amorphBufferPlugin)
Amorph.loadPlugin(amorphBase58Plugin)
Amorph.ready()

exports.getUnixFileMultihash = function getUnixMultihash(file) {
  arguguard('getUnixMultihash', [Amorph], arguments)
  const data = new UnixFs('file', file.to('buffer'))
  const dagNode = new DAGNode(data.marshal(), [])
  return new Amorph(dagNode.toJSON().Hash, 'base58')
}

exports.stripSha2256Multihash = function stripSha256Multihash(multihash) {
  arguguard('stripSha2256Multihash', [Amorph], arguments)
  return multihash.as('buffer', (buffer) => {
    return Buffer.from(buffer).slice(2)
  })
}

const prefix = new Buffer([0x12, 32])

exports.unstripSha2256Hash = function unstripSha2256Hash(multihash) {
  arguguard('unstripSha2256Hash', [Amorph], arguments)
  return multihash.as('buffer', (buffer) => {
    return Buffer.concat([
      prefix,
      buffer
    ])
  })
}
