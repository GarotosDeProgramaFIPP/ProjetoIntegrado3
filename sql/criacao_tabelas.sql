create table tb_usuarios_pf (
	UsuarioId int not null auto_increment,
    UsuarioNome varchar(50) not null,
    UsuarioLogin varchar(30) not null,
    UsuarioSenha varchar(30) not null,
    UsuarioTelefone varchar(15),
    UsuarioEndereco varchar(200),
    UsuarioAdministrador boolean,
    UsuarioVoluntario boolean,
    UsuarioDocumento varchar(50) not null,
    primary key (UsuarioId)
);

create table tb_usuarios_pj (
	UsuarioId int not null auto_increment,
    UsuarioNome varchar(50) not null,
    UsuarioLogin varchar(30) not null,
    UsuarioSenha varchar(30) not null,
    UsuarioTelefone varchar(15),
    UsuarioEndereco varchar(200),
    UsuarioDocumento varchar(50) not null,
    primary key (UsuarioId)
);

create table tb_evento_status (
	EventoStatusId int not null auto_increment,
    EventoStatusDescricao varchar(50),
    primary key (EventoStatusId)
);

create table tb_eventos (
	EventoId int not null auto_increment,
    EventoNome varchar(50) not null,
    EventoData datetime,
    EventoStatusId int not null,
    primary key (EventoId),
    foreign key (EventoStatusId) references tb_evento_status (EventoStatusId)
);

create table tb_patrimonios (
	PatrimonioId int not null auto_increment,
    PatrimonioNome varchar(50)  not null,
    PatrimonioAlocado boolean,
    primary key (PatrimonioId)
);

create table tb_evento_patrimonio (
    PatrimonioId int not null,
    EventoId int not null,
    primary key (PatrimonioId, EventoId),
    foreign key (PatrimonioId) references tb_patrimonios (PatrimonioId),
    foreign key (EventoId) references tb_eventos (EventoId)
);

create table tb_produtos (
	ProdutoId int not null auto_increment,
    ProdutoNome varchar(50) not null,
    ProdutoValor decimal(10, 2),
    ProdutoQuantidade int unsigned,
    ProdutoOrigem varchar(30) not null,
    primary key (ProdutoId)
);

-------------- // -----------------------

create table tb_vendas (
	VendaId int not null auto_increment,
    VendaData date,
    ProdutoId int not null,
    UsuarioId int not null,
    primary key (VendaId, UsuarioId, ProdutoId),
    foreign key (UsuarioId) references tb_usuarios (UsuarioId),
    foreign key (ProdutoId) references tb_produtos (ProdutoId)
);

create table tb_relatorio_tipos (
	RelatorioTipoId int not null auto_increment,
    RelatorioTipoNome varchar (30),
    RelatorioTipoFiltros enum('dataInicial', 'dataFinal', 'valor', 'quantidade', 'nome', 'status'),
    primary key (RelatorioTipoId)
);

create table tb_relatorios (
	RelatorioId int not null auto_increment,
    RelatorioTipoId int not null,
    DataEmissao datetime not null,
    UsuarioId int not null,
    primary key (RelatorioId, UsuarioId),
    foreign key (RelatorioTipoId) references tb_relatorio_tipos (RelatorioTipoId),
    foreign key (UsuarioId) references tb_usuarios (UsuarioId)
);

