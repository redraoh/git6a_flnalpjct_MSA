module "vpc" {
  source = "./modules/vpc"
}

module "bastion_host" {
  source = "./modules/instance/bastion_host"
  pubsntA_id = module.vpc.pubsntA
  sg_id = module.vpc.sg_id
}

module "control_node" {
  source = "./modules/instance/control_node"
  pubsntA_id = module.vpc.pubsntA
  sg_id = module.vpc.sg_id
}

module "DB_server" {
  source = "./modules/instance/DB_server"
  pubsntA_id = module.vpc.pubsntA
  sg_id = module.vpc.sg_id
}


module "mk8s" {
  source = "./modules/instance/mk8s"
  pubsntA_id = module.vpc.pubsntA
  pubsntC_id = module.vpc.pubsntC
  prvsntA_id = module.vpc.prvsntA
  prvsntC_id = module.vpc.prvsntC
  sg_id = module.vpc.sg_id
}

module "monitoring" {
  source = "./modules/instance/monitoring"
  pubsntA_id = module.vpc.pubsntA
  sg_id = module.vpc.sg_id
}




output "bastion_public_ip" {
  value = module.bastion_host.public_ip
}

output "control_node_public_ip" {
  value = module.control_node.public_ip
}

output "k8s_master" {
  value = module.mk8s.master_public_ip
}

output "k8s_worker" {
  value = module.mk8s.worker_public_ip
}

output "DB_server" {
  value = module.DB_server.public_ip
}

output "monitoring" {
  value = module.monitoring.public_ip
}


