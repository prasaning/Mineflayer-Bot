import msmcauth
import requests
import concurrent.futures
import threading
import os


accounts = open("accounts.txt").readlines()

def get_token(acc):
    while True:
        try:
            sess = requests.session()
            sess.proxies = {
                "http": "proxies",
                "https": "httpproxes",
            }
            u, p = acc.split(":")
            result = msmcauth.login(u, p, sess)
            print(result.username, result.uuid, result.access_token, sep=":")
            with open("sessions.txt", "a+") as f:
                f.write(result.username + ":" + result.uuid + ":" + result.access_token + "\n")
            break
        except Exception as e:
            pass


if __name__ == '__main__':
    if os.path.exists("sessions.txt"):
        os.remove("sessions.txt")
    for account in accounts:
        account = account.strip()
        threading.Thread(target=get_token, args=(account,)).start()