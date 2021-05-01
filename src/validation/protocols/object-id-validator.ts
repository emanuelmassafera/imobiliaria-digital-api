export interface ObjectIdValidator {
  isObjectId: (objectId: any) => Promise<boolean>
}
