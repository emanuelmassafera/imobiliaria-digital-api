import { QueryBuilder } from '@/infra/db'

const makeSut = (): QueryBuilder => {
  return new QueryBuilder()
}

describe('Query Builder', () => {
  test('Should call addStep correctly when calling match', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.match({})
    expect(addStepSpy).toHaveBeenCalledWith('$match', {})
  })

  test('Should call addStep correctly when calling group', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.group({})
    expect(addStepSpy).toHaveBeenCalledWith('$group', {})
  })

  test('Should call addStep correctly when calling sort', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.sort({})
    expect(addStepSpy).toHaveBeenCalledWith('$sort', {})
  })

  test('Should call addStep correctly when calling unwind', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.unwind({})
    expect(addStepSpy).toHaveBeenCalledWith('$unwind', {})
  })

  test('Should call addStep correctly when calling lookup', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.lookup({})
    expect(addStepSpy).toHaveBeenCalledWith('$lookup', {})
  })

  test('Should call addStep correctly when calling project', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.project({})
    expect(addStepSpy).toHaveBeenCalledWith('$project', {})
  })

  test('Should call addStep correctly when calling filter', async () => {
    const sut = makeSut()
    const addStepSpy = jest.spyOn(sut, 'addStep')
    sut.filter({})
    expect(addStepSpy).toHaveBeenCalledWith('$filter', {})
  })

  test('Should return the query when calling build', async () => {
    const sut = makeSut()
    const query = sut.build()
    expect(query).toEqual(sut.query)
  })
})
