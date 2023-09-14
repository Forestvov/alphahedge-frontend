export interface IChangeStatus {
  id: number
  changeStatus: (id: number, status: string) => any
  updateData: () => Promise<void>
  status: string
  processKey: string
  cancelKey: string
  successKey: string
  notVerifiedEmail?: string
  notVerifiedYC?: string
}
