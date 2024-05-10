output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "pubsntA" {
  value = aws_subnet.public_subnet_a.id
}

output "pubsntC" {
  value = aws_subnet.public_subnet_c.id
}

output "prvsntA" {
  value = aws_subnet.private_subnet_a.id
}

output "prvsntC" {
  value = aws_subnet.private_subnet_c.id
}

output "sg_id" {
  value = aws_security_group.sg.id
}

output "igw_id" {
  value = aws_internet_gateway.igw.id

}

output "natgw_id" {
  value = aws_nat_gateway.natgw.id

}