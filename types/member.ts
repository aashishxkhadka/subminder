export interface Member {
  id: string
  fullName: string
  email: string
  phone: string
  gender: string
  subscriptionStatus: string
  startDate: Date
  endDate: Date
  subscriptionPlanId: string
  subscriptionPlan: {
    id: string
    planName: string
    price: number
  }
}

export interface MemberFormData {
  fullName: string
  email: string
  phone: string
  gender: string
  startDate: string
  endDate: string
  subscriptionPlanId: string
} 