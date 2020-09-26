.PHONY:udb
udb:
	cd YunZhi.WebAPI && dotnet ef database update -c YunZhiDbContext

.PHONY:mig
mig:
	cd YunZhi.WebAPI && dotnet ef migrations add ${name} -c YunZhiDbContext