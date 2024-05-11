variable "keyname" {
  type = string
  default = "MyKeyPair03"
}

variable "amimage" {
  type = string
  default = "ami-01ed8ade75d4eee2f"   # ap1-ubuntu 2204
}

variable "pubsntA_id" {
  description = "public subnet A"
  type = string
}

variable "prvsntA_id" {
  description = "private subnet A"
  type = string
}

variable "pubsntC_id" {
  description = "public subnet C"
  type = string
}

variable "prvsntC_id" {
  description = "private subnet C"
  type = string
}

variable "sg_id" {
  description = "security group"
  type = string
}