ng build

Copy-Item -Path C:\inetpub\wwwroot\dist  -Recurse  -Destination C:\inetpub\wwwroot\dist_old
 
Copy-Item ./dist -Recurse C:\inetpub\wwwroot\dist

Copy-Item -Path C:\inetpub\wwwroot\dist_old\index.html -Destination C:\inetpub\wwwroot\dist\index.html