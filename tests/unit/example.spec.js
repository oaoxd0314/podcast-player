import { shallowMount } from '@vue/test-utils'
import {toStrMountAndDay,secFormateStr,secFormateTime,parseMapToJson,reverseJsonToMap } from '../../src/helper'


describe('Formater Test', () => {
  const nowDate = new Date()
  const Day = 60 * 60 * 24

  test('Date() to Str', () => {
    expect(toStrMountAndDay(nowDate)).toBe('星期四')
  })

  const testSec =  60*2 + 35
  const testSec2 = 60*60*3 + 35*60 + 7
  test('sec to formate str', () => {
    expect(secFormateStr(testSec)).toBe('2分鐘')
    expect(secFormateStr(testSec2)).toBe('3小時 35分鐘')
  })


  test('sec to hh:mm:ss', () => {
    expect(secFormateTime(testSec)).toBe('02:35')
    expect(secFormateTime(testSec2)).toBe('03:35:07')
  })

  const newMap = new Map([['white','#fff']]) 
  const jsonMap = '[["white","#fff"]]'

  test('map to json', () => {
    expect(parseMapToJson(newMap)).toBe(jsonMap)
  })
  
  test('json to map', () => {
    expect(reverseJsonToMap(jsonMap)).toMatchObject(newMap)
  })
})
