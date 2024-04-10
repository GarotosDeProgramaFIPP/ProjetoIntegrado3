create table tb_perfis (
	PerfilId int not null auto_increment,
    PerfilNome varchar(20) not null,
    primary key (PerfilId)
);

create table tb_usuarios (
	UsuarioId int not null auto_increment,
    PerfilId int not null,
    UsuarioNome varchar(50) not null,
    UsuarioLogin varchar(30) not null,
    UsuarioSenha varchar(30) not null,
    UsuarioTelefone varchar(15),
    UsuarioEndereco varchar(200),
    primary key (UsuarioId),
    foreign key (PerfilId) references tb_perfis (PerfilId)
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
    EventoStatusId int not null,UsuarioId int not null,
    primary key (EventoId, UsuarioId),
    foreign key (EventoStatusId) references tb_evento_status (EventoStatusId),
    foreign key (UsuarioId) references tb_usuarios (UsuarioId)
);

create table tb_setores(
	SetorId int not null auto_increment,
    SetorNome varchar(30) not null,
    primary key (SetorId)
);

create table tb_patrimonios (
	PatrimonioId int not null auto_increment,
    PatrimonioNome varchar(50)  not null,
    primary key (PatrimonioId)
);

create table tb_alocacao_patrimonios (
	AlocacaoId int not null auto_increment,
    AlocacaoData date,
    PatrimonioId int not null,
    SetorId int not null,
    UsuarioId int not null,
    primary key (AlocacaoId, PatrimonioId, SetorId, UsuarioId),
    foreign key (PatrimonioId) references tb_patrimonios (PatrimonioId),
    foreign key (SetorId) references tb_setores (SetorId),
    foreign key (UsuarioId) references tb_usuarios (UsuarioId)
);

create table tb_produto_origens (
	ProdutoOrigemId int not null auto_increment,
    ProdutoOrigemNome varchar(30),
    primary key (ProdutoOrigemId)
);

create table tb_produtos (
	ProdutoId int not null auto_increment,
    ProdutoNome varchar(50) not null,
    ProdutoValor decimal(10, 2),
    ProdutoOrigemId int not null,
    primary key (ProdutoId),
    foreign key (ProdutoOrigemId) references tb_produto_origens (ProdutoOrigemId)
);

create table tb_vendas (
	VendaId int not null auto_increment,
    VendaData datetime,
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

