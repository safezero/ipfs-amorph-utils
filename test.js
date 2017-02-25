const chai = require('chai')
const chaiAmorph = require('chai-amorph')
const utils = require('./')
const Amorph = require('amorph')

chai.use(chaiAmorph)
chai.should()

const file = new Amorph('hello world', 'ascii')
const multihash = new Amorph('Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD', 'base58')
const hash = new Amorph('F852C7FA62F971817F54D8A80DCD63FCF7098B3CBDE9AE8EC1EE449013EC5DB0', 'hex')

describe('ipfs-amorph-utils', () => {
  it('should getUnixFileMultihash correctly', () => {
    utils.getUnixFileMultihash(file).should.amorphEqual(multihash)
  })

  it('should stripSha2256Multihash correctly', () => {
    utils.stripSha2256Multihash(multihash).should.amorphEqual(hash)
  })

  it('should unstripSha2256Hash correctly', () => {
    utils.unstripSha2256Hash(hash).should.amorphEqual(multihash)
  })
})
