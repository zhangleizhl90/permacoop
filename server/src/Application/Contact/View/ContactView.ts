export class ContactView {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly company: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly notes: string,
    public readonly contactedById?: string,
    public readonly contactedByName?: string
  ) {}
}
