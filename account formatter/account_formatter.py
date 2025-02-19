input_file = "emails.txt"
output_file = "accounts.js"
proxy = "socks5://jdmixfmw-rotate:2h8zx3b6jb5s@p.webshare.io:80"

accounts = []
with open(input_file, "r") as f:
    for line in f:
        email, password = line.strip().split(":")
        accounts.append(f"{{username: '{email}', password: '{password}', proxy: '{proxy}'}}")

with open(output_file, "w") as f:
    f.write("const accounts = [\n")
    f.write(",\n".join(accounts))
    f.write("\n];")