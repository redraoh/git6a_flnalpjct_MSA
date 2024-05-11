# VPC 생성
resource "aws_vpc" "vpc" {
  cidr_block = "192.168.48.0/20"
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = { Name = "MyVPC03" }
}

# 서브넷 생성
resource "aws_subnet" "public_subnet_a" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "192.168.56.0/24"
  availability_zone = "ap-northeast-2a"

  tags = { Name = "PubSubnetA-03" }
}

resource "aws_subnet" "public_subnet_c" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "192.168.57.0/24"
  availability_zone = "ap-northeast-2c"

  tags = { Name = "PubSubnetC-03" }
}

resource "aws_subnet" "private_subnet_a" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "192.168.58.0/24"
  availability_zone = "ap-northeast-2a"

  tags = { Name = "PrvSubnetA-03" }
}

resource "aws_subnet" "private_subnet_c" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "192.168.59.0/24"
  availability_zone = "ap-northeast-2c"

  tags = { Name = "PrvSubnetC-03" }
}

# 인터넷 게이트웨이
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = { Name = "MyIGW03" }
}

# 라우팅 테이블 생성 및 인터넷 게이트웨이 연결
resource "aws_route_table" "pubrtb" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "PubRTB03" }
}

# 서브넷과 라우팅 테이블 연결
resource "aws_route_table_association" "pubrtbA_link" {
  subnet_id = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.pubrtb.id
}

resource "aws_route_table_association" "pubrtbC_link" {
  subnet_id = aws_subnet.public_subnet_c.id
  route_table_id = aws_route_table.pubrtb.id
}

# NAT 게이트웨이 생성 및 연결
resource "aws_eip" "eip" {
  domain = "vpc"
  depends_on = [aws_internet_gateway.igw]

  tags = { Name = "MyEIP-03" }
}

resource "aws_nat_gateway" "natgw" {
  allocation_id = aws_eip.eip.id
  subnet_id     = aws_subnet.public_subnet_a.id

  tags = { Name = "MyNatGW-03" }
}

# 라우팅 테이블 생성 및 NAT 게이트웨이 연결
resource "aws_route_table" "prvrtb" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgw.id
  }

  tags = { Name = "PrvRTB03" }
}

# 서브넷과 라우팅 테이블 연결
resource "aws_route_table_association" "prvrtbA_link" {
  subnet_id = aws_subnet.private_subnet_a.id
  route_table_id = aws_route_table.prvrtb.id
}

resource "aws_route_table_association" "prvrtbC_link" {
  subnet_id = aws_subnet.private_subnet_c.id
  route_table_id = aws_route_table.prvrtb.id
}

# 보안그룹 생성
resource "aws_security_group" "sg" {
  name_prefix = "my-sg03-"
  vpc_id = aws_vpc.vpc.id

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port = 25000
    to_port = 25000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 16443
    to_port = 16443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 3000
    to_port = 3000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "MySG03" }
}
