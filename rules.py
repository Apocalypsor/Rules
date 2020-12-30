import os
import re

def convertToClash(domain: list, domain_suffix: list):
    result = "payload:\n"

    for d in domain:
        tmp = d.lstrip("full:").rstrip("\n")
        result += f"  - '{tmp}'\n"

    for d in domain_suffix:
        tmp = d.rstrip("\n")
        result += f"  - '+.{tmp}'\n"

    return result

def convertToSurge(domain: list, domain_suffix: list):
    result = ""

    for d in domain:
        tmp = d.lstrip("full:").rstrip("\n")
        result += f"DOMAIN,{tmp}\n"

    for d in domain_suffix:
        tmp = d.rstrip("\n")
        result += f"DOMAIN-SUFFIX,{tmp}\n"

    return result

def main(v2ray_rules_path, clash_rules_path, surge_rules_path):
    files = os.listdir(v2ray_rules_path)

    for f in files:
        domain = []
        domain_suffix = []
        with open(os.path.join(v2ray_rules_path, f), "r") as ff:
            rules = ff.readlines()

        for r in rules:
            if re.match(r"^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$", r):
                domain_suffix.append(r)
            elif re.match(r"full:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$", r):
                domain.append(r)

        with open(os.path.join(clash_rules_path, f), "w") as ff:
            ff.write(convertToClash(domain, domain_suffix))

        with open(os.path.join(surge_rules_path, f), "w") as ff:
            ff.write(convertToSurge(domain, domain_suffix))

if __name__ == "__main__":
    v2ray_rules_path = "data"
    clash_rules_path = "clash_output"
    surge_rules_path = "surge_output"

    os.makedirs(clash_rules_path, exist_ok=True)
    os.makedirs(surge_rules_path, exist_ok=True)

    main(v2ray_rules_path, clash_rules_path, surge_rules_path)
