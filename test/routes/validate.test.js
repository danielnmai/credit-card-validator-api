'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const { build } = require('../helper')
const { getApp } = require('../../build/src/app')

const app = getApp()

test('it should response properly', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '1234' }
  })

  assert.equal(res.statusCode, 200)
})

test('it should return false if card number is invalid', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '6011000991300001' }
  })

  const expected = JSON.stringify({ valid: false })

  assert.equal(res.payload, expected)
})

test('it should return false if card number len is not 15 or 16', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '6011000991300009999' }
  })

  const expected = JSON.stringify({ valid: false })

  assert.equal(res.payload, expected)
})

test('it should still return true if the number is correct but there are whitespaces', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '6011000991300009     ' }
  })

  const expected = JSON.stringify({ valid: true })

  assert.equal(res.payload, expected)
})

test('it should return true if card number is valid', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '374245455400126' }
  })

  const expected = JSON.stringify({ valid: true })

  assert.equal(res.payload, expected)
})

test('it should return true if it is a valid Visa number', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '4263982640269299' }
  })

  const expected = JSON.stringify({ valid: true })

  assert.equal(res.payload, expected)
})

test('it should return true if it is a valid Mastercard number', async (t) => {
  const res = await app.inject({
    url: '/validate',
    method: 'POST',
    payload: { cardNumber: '2222420000001113' }
  })

  const expected = JSON.stringify({ valid: true })

  assert.equal(res.payload, expected)
})
